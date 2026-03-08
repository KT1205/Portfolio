"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import styles from "./LeftPanel.module.css";
import { useOS } from "@/context/OSContext";
import { Menu, X, Layout, Box, FileText, Cpu, Award, Terminal } from "lucide-react";

type ModuleType = "CORE_IDENTITY" | "PROJECT_MATRIX" | "EXPERIENCE_LOG" | "TECH_NETWORK" | "CERTIFICATION_VAULT" | "CONTACT_NODE";

export default function LeftPanel() {
    const { activeModule, setActiveModule, setTerminalOpen } = useOS();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const modules: { id: ModuleType; label: string; icon: React.ReactNode }[] = [
        { id: "CORE_IDENTITY", label: "IDENTITY", icon: <Layout size={20} /> },
        { id: "PROJECT_MATRIX", label: "ASSETS", icon: <Box size={20} /> },
        { id: "EXPERIENCE_LOG", label: "LOGS", icon: <FileText size={20} /> },
        { id: "TECH_NETWORK", label: "NEXUS", icon: <Cpu size={20} /> },
        { id: "CERTIFICATION_VAULT", label: "VAULT", icon: <Award size={20} /> },
        { id: "CONTACT_NODE", label: "TERMINAL", icon: <Terminal size={20} /> },
    ];

    const handleModuleSelect = (id: ModuleType) => {
        if (id === "CONTACT_NODE") {
            setTerminalOpen(true);
        } else {
            setActiveModule(id);
        }
        setIsMenuOpen(false);
    };

    return (
        <>
            {/* Desktop Sidebar */}
            {!isMobile && (
                <motion.nav
                    className={styles.sidebar}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                >
                    <div className={styles.logoCont}>
                        <div className={styles.pulseDot}></div>
                        <span className={styles.sysName}>AI_OS // v2.4</span>
                    </div>

                    <div className={styles.moduleList}>
                        {modules.map((mod) => (
                            <button
                                key={mod.id}
                                className={`${styles.moduleBtn} ${activeModule === mod.id ? styles.active : ""}`}
                                onClick={() => handleModuleSelect(mod.id)}
                            >
                                {activeModule === mod.id && (
                                    <motion.div layoutId="activeHighlight" className={styles.activeHighlight} />
                                )}
                                <span className={styles.modIcon}>{mod.icon}</span>
                                <span className={styles.modText}>{mod.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className={styles.bottomStatus}>
                        <div className={styles.statusLine}></div>
                        <span className={styles.statusText}>UPLINK // SECURE</span>
                    </div>
                </motion.nav>
            )}

            {/* Mobile Nav FAB */}
            {isMobile && (
                <div className={styles.mobileNavWrapper}>
                    <button
                        className={styles.fab}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="System Menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                className={styles.mobileOverlay}
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            >
                                <div className={styles.overlayHeader}>
                                    <div className={styles.pulseDot}></div>
                                    <span>SYSTEM_CORE // NAV_MATRIX</span>
                                </div>
                                <div className={styles.overlayGrid}>
                                    {modules.map((mod) => (
                                        <button
                                            key={mod.id}
                                            className={`${styles.gridBtn} ${activeModule === mod.id ? styles.gridActive : ""}`}
                                            onClick={() => handleModuleSelect(mod.id)}
                                        >
                                            <div className={styles.gridIcon}>{mod.icon}</div>
                                            <span className={styles.gridLabel}>{mod.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </>
    );
}
