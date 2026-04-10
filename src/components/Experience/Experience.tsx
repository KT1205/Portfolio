"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import styles from "./Experience.module.css";
import { portfolioData } from "@/data/portfolio";
import { Terminal, Clock, ShieldCheck, ChevronDown, ChevronUp } from "lucide-react";

export default function Experience() {
    const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
    const [expandedId, setExpandedId] = useState<number | null>(null);

    return (
        <section className={`section ${styles.experienceSection}`} id="experience">
            <motion.div
                className={styles.headerRow}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: customEase }}
            >
                <div className={styles.systemStatus}>
                    <div className={styles.pulseIndicator}></div>
                    <span>SYSTEM_EVENT_LOG // SECURE</span>
                </div>
            </motion.div>

            <div className={styles.logContainer}>
                {portfolioData.experiences.map((exp, index) => {
                    const isExpanded = expandedId === exp.id;
                    return (
                        <motion.div
                            key={exp.id}
                            className={`${styles.logEntry} ${isExpanded ? styles.expanded : ''}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1, ease: customEase }}
                            onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                        >
                            <div className={styles.logHeader}>
                                <div className={styles.companyInfo}>
                                    <div className={styles.companyBadge}>
                                        <ShieldCheck size={18} className={styles.badgeIcon} />
                                    </div>
                                    <div className={styles.titleStack}>
                                        <h3 className={styles.roleTitle}>{exp.role}</h3>
                                        <span className={styles.companyName}>@ {exp.company}</span>
                                    </div>
                                </div>

                                <div className={styles.logMeta}>
                                    <div className={styles.durationBadge}>
                                        <Clock size={12} />
                                        <span>{exp.date}</span>
                                    </div>
                                    <div className={styles.logStatus}>
                                        <Terminal size={14} className={styles.statusIcon} />
                                        <span>SYSTEM_SYNCED</span>
                                    </div>
                                    <div className={styles.expandToggle}>
                                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </div>
                                </div>
                            </div>

                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        className={styles.logDetails}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3, ease: customEase }}
                                    >
                                        <div className={styles.detailContent}>
                                            <div className={styles.detailLine}></div>
                                            <p className={styles.description}>
                                                <span className={styles.promptArrow}>{'>'}</span> {exp.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
