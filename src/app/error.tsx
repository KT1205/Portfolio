"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Terminal, AlertTriangle } from "lucide-react";
import styles from "./error.module.css";

export default function ErrorPage() {
    return (
        <div className={styles.errorWrapper}>
            {/* Holographic background overlay */}
            <div className={styles.scanLine} aria-hidden="true"></div>

            <motion.div
                className={styles.errorContainer}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className={styles.statusHeader}>
                    <motion.div
                        className={styles.pulseDot}
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span>SYSTEM_ERROR // CRITICAL</span>
                </div>

                <motion.div
                    className={styles.glitchCode}
                    animate={{
                        opacity: [1, 0.8, 1, 0.9, 1],
                        x: [-1, 1, -2, 0, 1]
                    }}
                    transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
                >
                    500
                </motion.div>

                <h1 className={styles.title}>ACCESS DENIED</h1>

                <p className={styles.message}>
                    So sorry, a module has encountered an unexpected termination.
                    The nexus core is currently attempting data recovery.
                    This connection will be restored shortly.
                </p>

                <div className={styles.actionArea}>
                    <Link href="/" className={styles.backButton}>
                        <ArrowLeft size={18} /> [ RETURN TO INTERFACE ]
                    </Link>

                    <div className={styles.systemLog}>
                        <span>ID: REF_{Math.random().toString(36).substring(7).toUpperCase()} // STATUS: RECALIBRATING</span>
                    </div>
                </div>
            </motion.div>

            {/* Ambient decoration */}
            <motion.div
                style={{ position: "absolute", bottom: "10%", left: "5%", color: "var(--accent-cyan)", opacity: 0.2 }}
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
            >
                <AlertTriangle size={120} strokeWidth={0.5} />
            </motion.div>

            <motion.div
                style={{ position: "absolute", top: "15%", right: "8%", color: "var(--accent-purple)", opacity: 0.15 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
                <Terminal size={150} strokeWidth={0.3} />
            </motion.div>
        </div>
    );
}
