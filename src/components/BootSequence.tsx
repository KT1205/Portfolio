"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./BootSequence.module.css";

export default function BootSequence({ onComplete }: { onComplete?: () => void }) {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let isMounted = true;

        // Only run once per session
        if (sessionStorage.getItem("bootComplete") === "true") {
             
             
            setIsLoading(false);
            if (onComplete) onComplete();
            return;
        }

        let percent = 0;
        const interval = setInterval(() => {
            percent += Math.random() * 10 + 5;
            if (percent > 100) percent = 100;

            if (isMounted) setProgress(Math.floor(percent));

            if (percent === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    if (isMounted) {
                        sessionStorage.setItem("bootComplete", "true");
                        setIsLoading(false);
                        if (onComplete) onComplete();
                    }
                }, 800);
            }
        }, 150);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [onComplete]);

    if (!isLoading) return null;

    return (
        <motion.div
            className={styles.sysOverlay}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className={styles.terminalContainer}>
                <div className={styles.bootLines}>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className={styles.line}>INITIALIZING AI_LAB_ENVIRONMENT...</motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className={styles.line}>LOADING_DEVELOPER_MODULES... OK</motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className={styles.line}>MAPPING_PROJECT_GRAPH... SECURE</motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className={styles.line}>ESTABLISHING_NETWORK_NODES... CONNECTED</motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className={styles.line}>AUTHENTICATION_SUCCESSFUL...</motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className={styles.line} style={{ color: 'var(--accent-cyan)' }}>ACCESS GRANTED</motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className={styles.progressBar}
                    >
                        <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
                        <span className={styles.progressText}>{progress}% INTEGRATED</span>
                    </motion.div>
                </div>
            </div>

            {/* Ambient Scanning Line */}
            <div className={styles.scanLine}></div>
        </motion.div>
    );
}
