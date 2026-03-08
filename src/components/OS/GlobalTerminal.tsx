"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import styles from "./GlobalTerminal.module.css";
import { useOS } from "@/context/OSContext";
import { portfolioData } from "@/data/portfolio";
import { sysSound } from "@/utils/sound";

export default function GlobalTerminal() {
    const { isTerminalOpen, setTerminalOpen, setActiveModule } = useOS();
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<{ id: number; text: string; type: "user" | "system" | "error" | "link" | "success" }[]>([
        { id: 1, text: "AI_LAB_TERMINAL_V2.0.4 ONLINE", type: "system" },
        { id: 2, text: "Type 'help' to see available system commands.", type: "system" }
    ]);
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Global toggle listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "`") {
                e.preventDefault();
                setTerminalOpen(!isTerminalOpen);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isTerminalOpen, setTerminalOpen]);

    // Auto focus and scroll
    useEffect(() => {
        if (isTerminalOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [isTerminalOpen, history]);

    const handleCommand = (cmd: string) => {
        if (sysSound) sysSound.terminalType();

        const trimmed = cmd.trim().toLowerCase();
        let response: { text: string; type: "system" | "error" | "link" | "success" }[] = [];

        switch (trimmed) {
            case "help":
                response = [
                    { text: "CORE SYSTEM COMMANDS:", type: "system" },
                    { text: "  projects         Access deployment matrix", type: "system" },
                    { text: "  experience       View system logs", type: "system" },
                    { text: "  skills           Scan skill network", type: "system" },
                    { text: "  certifications   View certification vault", type: "system" },
                    { text: "  contact          Establish comms channel", type: "system" },
                    { text: "---------------------------------------------", type: "system" },
                    { text: "  resume           Access encrypted credentials", type: "system" },
                    { text: "  clear            Wipe terminal history", type: "system" },
                    { text: "  exit             Close terminal overlay", type: "system" },
                ];
                break;
            case "identity":
                setActiveModule("CORE_IDENTITY");
                response = [{ text: ">> LOADING IDENTITY MODULE...", type: "success" }];
                break;
            case "projects":
                setActiveModule("PROJECT_MATRIX");
                response = [{ text: ">> ACCESSING PROJECT MATRIX...", type: "success" }];
                break;
            case "experience":
                setActiveModule("EXPERIENCE_LOG");
                response = [{ text: ">> RETRIEVING SYSTEM LOGS...", type: "success" }];
                break;
            case "skills":
            case "tech":
                setActiveModule("TECH_NETWORK");
                response = [{ text: ">> SCANNING TECH NETWORK...", type: "success" }];
                break;
            case "certifications":
            case "certs":
                setActiveModule("CERTIFICATION_VAULT");
                response = [{ text: ">> ACCESSING SECURE VAULT...", type: "success" }];
                break;
            case "contact":
                setActiveModule("CONTACT_NODE"); // Handled by Contact module visually
                setTerminalOpen(false); // Close terminal so user sees the module
                setInput("");
                return;
            case "linkedin":
                window.open(portfolioData.linkedin, '_blank');
                response = [{ text: ">> ROUTING TO LINKEDIN...", type: "link" }];
                break;
            case "github":
                window.open(portfolioData.github, '_blank');
                response = [{ text: ">> OPENING REPOSITORIES...", type: "link" }];
                break;
            case "resume":
                window.open(portfolioData.resumeUrl, '_blank');
                response = [{ text: ">> DECRYPTING CREDENTIALS...", type: "link" }];
                break;
            case "clear":
                setHistory([{ id: Date.now(), text: "TERMINAL SYSTEM WIPED.", type: "system" }]);
                setInput("");
                return;
            case "exit":
            case "close":
                setTerminalOpen(false);
                setInput("");
                return;
            case "":
                break;
            default:
                response = [{ text: `ERROR: COMMAND NOT RECOGNIZED '${trimmed}'. TYPE 'help'.`, type: "error" }];
        }

        const newEntries = [
            { id: Date.now(), text: `> ${cmd}`, type: "user" as const },
            ...response.map((r, i) => ({ ...r, id: Date.now() + i + 1 }))
        ];

        setHistory(prev => [...prev, ...newEntries]);
        setInput("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleCommand(input);
        }
    };

    return (
        <AnimatePresence>
            {isTerminalOpen && (
                <>
                    <motion.div
                        className={styles.backdrop}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setTerminalOpen(false)}
                    />
                    <motion.div
                        className={styles.terminalWrapper}
                        initial={{ y: "20%", x: "-50%", opacity: 0, scale: 0.95 }}
                        animate={{ y: "-50%", x: "-50%", opacity: 1, scale: 1 }}
                        exit={{ y: "20%", x: "-50%", opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    >
                        <div className={styles.terminalHeader}>
                            <div className={styles.termDots}>
                                <button className={styles.dotRed} onClick={() => setTerminalOpen(false)}></button>
                                <span className={styles.dotYellow}></span>
                                <span className={styles.dotGreen}></span>
                            </div>
                            <span className={styles.termTitle}>root@ai-research-lab:~ (Press ` to close)</span>
                        </div>

                        <div className={styles.terminalWindow} onClick={() => inputRef.current?.focus()}>
                            <div className={styles.historyList}>
                                {history.map((line) => (
                                    <div key={line.id} className={`${styles.line} ${styles[line.type]}`}>
                                        {line.text}
                                    </div>
                                ))}
                                <div ref={bottomRef} />
                            </div>

                            <div className={styles.inputRow}>
                                <span className={styles.promptArrow}>$&nbsp;</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    className={styles.cmdInput}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    autoCapitalize="off"
                                    autoComplete="off"
                                    spellCheck="false"
                                />
                                <span className={styles.cursorBlock}></span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
