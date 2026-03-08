"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import styles from "./Contact.module.css";
import { portfolioData } from "@/data/portfolio";
import { Mail, Github, Linkedin, Copy, CheckCircle2 } from "lucide-react";

export default function Contact() {
    const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(portfolioData.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className={`section ${styles.contactSection}`} id="contact">
            <motion.div
                className={styles.contactWrapper}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: customEase }}
            >
                <div className={styles.systemStatus}>
                    <div className={styles.pulseIndicator}></div>
                    <span>COMMS // ESTABLISHED</span>
                </div>

                <h2 className={styles.commsTitle}>
                    Operator <span className="highlight-text">Communications</span>
                </h2>

                <div className={styles.commsGrid}>
                    <div className={styles.commCardHoverlessRow}>
                        <div className={styles.commIconWrapper}>
                            <Mail size={24} />
                        </div>
                        <div className={styles.commDetails}>
                            <span className={styles.commLabel}>SECURE_EMAIL</span>
                            <span className={styles.commValue}>{portfolioData.email}</span>
                        </div>
                    </div>

                    <a href={portfolioData.github} target="_blank" rel="noopener noreferrer" className={styles.commCard}>
                        <div className={styles.commIconWrapper}>
                            <Github size={24} />
                        </div>
                        <div className={styles.commDetails}>
                            <span className={styles.commLabel}>GITHUB_NODE</span>
                            <span className={styles.commValue}>@KT1205</span>
                        </div>
                    </a>

                    <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer" className={styles.commCard}>
                        <div className={styles.commIconWrapper}>
                            <Linkedin size={24} />
                        </div>
                        <div className={styles.commDetails}>
                            <span className={styles.commLabel}>LINKEDIN_PROFILE</span>
                            <span className={styles.commValue}>Kalp Thekdi</span>
                        </div>
                    </a>

                    <div className={styles.commCardHoverless}>
                        <div className={styles.commDetails}>
                            <span className={styles.commLabel}>COPY_EMAIL_ADDRESS</span>
                        </div>
                        <button className={styles.copyBtn} onClick={handleCopy}>
                            {copied ? <CheckCircle2 size={18} className={styles.successIcon} /> : <Copy size={18} />}
                            <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY TO CLIPBOARD'}</span>
                        </button>
                    </div>
                </div>

            </motion.div>
        </section>
    );
}
