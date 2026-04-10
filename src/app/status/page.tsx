"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Terminal, Hammer } from "lucide-react";
import styles from "../error.module.css"; // Reuse the same high-quality styles

export default function StatusPage() {
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
                    <span>SYSTEM_STATUS // INITIALIZING</span>
                </div>

                <motion.div
                    className={styles.glitchCode}
                    style={{ color: "var(--accent-purple)", textShadow: "0 0 10px rgba(121, 40, 202, 0.3)" }}
                    animate={{
                        opacity: [1, 0.7, 1, 0.8, 1],
                        y: [-1, 1, 0, -1, 1]
                    }}
                    transition={{ duration: 0.15, repeat: Infinity, repeatType: "mirror" }}
                >
                    WIP
                </motion.div>

                <h1 className={styles.title}>SOURCE CODE LINKING...</h1>

                <p className={styles.message}>
                    So sorry, this repository is currently being synchronized with the global nexus.
                    The code modules are being formatted and will be available for public decryption soon.
                    Please return to the main interface for other diagnostics.
                </p>

                <div className={styles.actionArea}>
                    <Link href="/" className={styles.backButton}>
                        <ArrowLeft size={18} /> [ RETURN TO INTERFACE ]
                    </Link>

                    <div className={styles.systemLog}>
                        <span>RECOVERY_TARGET: GITHUB_REPOS // STATUS: PENDING_DEPLOYMENT</span>
                    </div>
                </div>
            </motion.div>

            {/* Ambient decoration */}
            <motion.div
                style={{ position: "absolute", bottom: "10%", right: "10%", color: "var(--accent-purple)", opacity: 0.2 }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                <Hammer size={120} strokeWidth={0.5} />
            </motion.div>

            <motion.div
                style={{ position: "absolute", top: "15%", left: "8%", color: "var(--accent-cyan)", opacity: 0.15 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
                <Terminal size={150} strokeWidth={0.3} />
            </motion.div>
        </div>
    );
}
