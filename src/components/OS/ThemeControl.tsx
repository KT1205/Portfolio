"use client";

import { useTheme } from "@/components/ThemeProvider";
import { motion } from "framer-motion";
import styles from "./ThemeControl.module.css";
import { Zap, ZapOff } from "lucide-react";

export default function ThemeControl() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={styles.container} onClick={toggleTheme} role="button" aria-label="Toggle system theme">
            <div className={styles.indicator}>
                <motion.div 
                    className={styles.lamp}
                    animate={{ 
                        opacity: [0.4, 1, 0.4],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <span className={styles.label}>OS_INTEGRITY</span>
            </div>
            
            <div className={styles.toggle}>
                <div className={styles.track}>
                    <motion.div 
                        className={styles.thumb}
                        animate={{ x: theme === 'light' ? 24 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                        {theme === 'light' ? <Zap size={10} /> : <ZapOff size={10} />}
                    </motion.div>
                </div>
                <div className={styles.labels}>
                    <span className={theme === 'dark' ? styles.activeLabel : ''}>DK</span>
                    <span className={theme === 'light' ? styles.activeLabel : ''}>LT</span>
                </div>
            </div>
        </div>
    );
}
