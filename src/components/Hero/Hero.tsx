"use client";

import { motion } from "framer-motion";
import styles from "./Hero.module.css";
import { portfolioData } from "@/data/portfolio";
import { useOS } from "@/context/OSContext";

export default function Hero() {
    const { setActiveModule, setTerminalOpen } = useOS();
    const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50, filter: "blur(12px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.2, ease: customEase } }
    };

    return (
        <section className={`section ${styles.hero}`} id="home">
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className={styles.profileContent}
            >
                {/* Top Row: Header Section */}
                <div className={styles.headerSection}>
                    <motion.div variants={itemVariants} className={styles.identityHeader}>
                        <div className={styles.badge}>
                            <motion.span
                                className={styles.glowDot}
                                animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            />
                            <span className={styles.badgeText}>OPERATOR // ACTIVE</span>
                        </div>
                        <h1 className={styles.name}>{portfolioData.name}</h1>
                        <h2 className={styles.title}>{portfolioData.title}</h2>

                        <div className={styles.actionRow}>
                            <button className="btn-primary" onClick={() => setActiveModule("PROJECT_MATRIX")}>
                                <span>View Assets</span>
                            </button>
                            <button className={styles.btnSecondary} onClick={() => setTerminalOpen(true)}>
                                <span>Comms Link</span>
                            </button>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className={styles.metricsColumn}>
                        <div className={styles.statsPanel}>
                            <h3 className={styles.panelTitle}>SYSTEM METRICS</h3>

                            <div className={styles.metricRow}>
                                <div className={styles.metricLabel}>PROJECTS_BUILT</div>
                                <div className={styles.metricValue}>{portfolioData.systemMetrics.projectsBuilt}</div>
                            </div>

                            <div className={styles.metricRow}>
                                <div className={styles.metricLabel}>TECH_STACKS_USED</div>
                                <div className={styles.metricValue}>{portfolioData.systemMetrics.techStacksUsed}</div>
                            </div>

                            <div className={styles.metricRow}>
                                <div className={styles.metricLabel}>CGPA</div>
                                <div className={styles.metricStack}>
                                    <div className={styles.metricValue}>{portfolioData.systemMetrics.cgpa}</div>
                                    <div className={styles.metricSubtitle}>{portfolioData.systemMetrics.cgpaSemester}</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Section: Profile Log */}
                <motion.div variants={itemVariants} className={styles.profileLog}>
                    <div className={styles.logHeader}>
                        <div className={styles.pulseTag}></div>
                        <h3 className={styles.logTitle}>SYSTEM_PROFILE // USER_IDENT_LOG</h3>
                    </div>

                    <div className={styles.logBody}>
                        <div className={styles.bracketDecoration}></div>
                        <p className={styles.mainDesc}>{portfolioData.description}</p>
                        <div className={styles.detailedContent}>
                            {portfolioData.about.paragraphs.map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            <div className={styles.perspectiveGrid}></div>
        </section>
    );
}
