"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import styles from "./Contact.module.css";
import { portfolioData } from "@/data/portfolio";
import { Mail, Github, Linkedin, CheckCircle2 } from "lucide-react";

export default function Contact() {
    const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(portfolioData.email).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        } else {
            // Fallback for older browsers or non-secure contexts
            const textArea = document.createElement("textarea");
            textArea.value = portfolioData.email;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Fallback copy failed', err);
            }
            document.body.removeChild(textArea);
        }
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
                    <div
                        className={styles.commCardEmail}
                        onClick={handleCopy}
                        title="Click to copy email"
                    >
                        <div className={styles.commIconWrapper}>
                            {copied ? <CheckCircle2 size={24} className={styles.successIcon} /> : <Mail size={24} />}
                        </div>
                        <div className={styles.commDetails}>
                            <span className={styles.commLabel}>{copied ? 'SYSTEM_COPIED' : 'SECURE_EMAIL'}</span>
                            <span className={styles.commValue}>{portfolioData.email}</span>
                        </div>
                        <div className={`${styles.copyHint} ${copied ? styles.hintActive : ''}`}>
                            {copied ? 'COPIED!' : 'CLICK TO COPY'}
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
                </div>

            </motion.div>
        </section>
    );
}
