"use client";

import { motion } from "framer-motion";
import styles from "./LeftPanel.module.css";
import { useOS } from "@/context/OSContext";

export default function LeftPanel() {
    const { activeModule, setActiveModule, setTerminalOpen } = useOS();

    const modules = [
        { id: "CORE_IDENTITY", label: "[01] IDENTITY" },
        { id: "PROJECT_MATRIX", label: "[02] ASSETS" },
        { id: "EXPERIENCE_LOG", label: "[03] LOGS" },
        { id: "TECH_NETWORK", label: "[04] NEXUS" },
        { id: "CERTIFICATION_VAULT", label: "[05] VAULT" },
        { id: "CONTACT_NODE", label: "[06] TERMINAL" },
    ] as const;

    return (
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
                        onClick={() => {
                            if (mod.id === "CONTACT_NODE") {
                                setTerminalOpen(true);
                            } else {
                                setActiveModule(mod.id);
                            }
                        }}
                    >
                        {activeModule === mod.id && (
                            <motion.div layoutId="activeHighlight" className={styles.activeHighlight} />
                        )}
                        <span className={styles.modText}>{mod.label}</span>
                    </button>
                ))}
            </div>

            <div className={styles.bottomStatus}>
                <div className={styles.statusLine}></div>
                <span className={styles.statusText}>UPLINK // SECURE</span>
            </div>
        </motion.nav>
    );
}
