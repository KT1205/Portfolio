"use client";

import { motion } from "framer-motion";
import styles from "./Achievements.module.css";
import { portfolioData } from "@/data/portfolio";

export default function Achievements() {
    const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

    return (
        <section className={`section ${styles.achievementsSection}`} id="achievements">
            <motion.div
                className={styles.headerRow}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: customEase }}
            >
                <div className={styles.systemStatus}>
                    <div className={styles.pulseIndicator}></div>
                    <span>SYSTEM ARCHIVE // METRICS</span>
                </div>
                <h2 className="section-title" style={{ marginBottom: 0 }}>
                    Lab <span className="highlight-text">Metrics</span>
                </h2>
            </motion.div>

            <div className={styles.grid}>
                {portfolioData.achievements.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className={styles.card}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: index * 0.1, ease: customEase }}
                    >
                        <div className={styles.cardGlow}></div>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.title}>{item.title}</h3>
                            <div className={styles.metricsBox}>
                                <span className={styles.metricsLabel}>DAT_INDEX</span>
                                <span className={styles.cardIndex}>M{String(index + 1).padStart(2, '0')}</span>
                            </div>
                        </div>
                        <p className={styles.description}>{item.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
