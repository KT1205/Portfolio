"use client";

import { motion } from "framer-motion";
import styles from "./About.module.css";
import { portfolioData } from "@/data/portfolio";

export default function About() {
    const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    const textVariants = {
        hidden: { opacity: 0, x: 30, filter: "blur(5px)" },
        show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 1.2, ease: customEase } }
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        show: { opacity: 1, scale: 1, transition: { duration: 1.5, ease: customEase } }
    };

    return (
        <section className={`section ${styles.about}`} id="about">
            <motion.div
                className={styles.layout}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
            >
                <motion.div className={styles.leftColumn} variants={imageVariants}>
                    <div className={styles.uiContainer}>
                        <div className={styles.cornerTls}></div>
                        <div className={styles.cornerTrs}></div>
                        <div className={styles.cornerBls}></div>
                        <div className={styles.cornerBrs}></div>

                        <div className={styles.scanningLine}></div>

                        <div className={styles.abstractVisual}>
                            <div className={styles.abstractShape}>
                                <div className={styles.ring1}></div>
                                <div className={styles.ring2}></div>
                                <div className={styles.ring3}></div>
                                <div className={styles.core}>
                                    <div className={styles.corePulse}></div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.dataReadout}>
                            <span>SYS.ID: KL-90X</span>
                            <span>STATUS: ONLINE</span>
                        </div>
                    </div>
                </motion.div>

                <div className={styles.rightColumn}>
                    <div className={styles.systemStatus}>
                        <div className={styles.pulseIndicator}></div>
                        <span>IDENTITY // ARCHIVE</span>
                    </div>
                    <motion.h2 className="section-title" variants={textVariants} style={{ marginBottom: "3rem", marginTop: "1rem" }}>
                        The <span className="highlight-text">Operator</span>
                    </motion.h2>

                    <motion.div className={styles.bioBlock} variants={textVariants}>
                        <div className={styles.bracketLeft}></div>
                        <div className={styles.bioContent}>
                            {portfolioData.about.paragraphs.map((p, i) => (
                                <p key={i} className={styles.bioText}>{p}</p>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div className={styles.statsPanel} variants={containerVariants}>
                        {portfolioData.about.stats.map((s, i) => (
                            <motion.div key={i} className={styles.statItem} variants={textVariants}>
                                <div className={styles.statLine}></div>
                                <span className={styles.statVal}>{s.value}</span>
                                <span className={styles.statLabel}>{s.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
