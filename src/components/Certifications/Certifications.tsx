"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import styles from "./Certifications.module.css";
import { portfolioData } from "@/data/portfolio";
import { CornerRightDown, ExternalLink } from "lucide-react";

export default function Certifications() {
    const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
    const [flippedStatus, setFlippedStatus] = useState<Record<string, boolean>>({});

    const handleFlip = (id: string, e: React.MouseEvent) => {
        // Prevent flipping ONLY if clicking the View Button or its children
        if ((e.target as HTMLElement).closest('button')) {
            return;
        }

        setFlippedStatus(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: customEase } }
    };

    return (
        <section className={`section ${styles.certSection}`} id="certifications">
            <motion.div
                className={styles.headerRow}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: customEase }}
            >
                <div className={styles.systemStatus}>
                    <div className={styles.pulseIndicator}></div>
                    <span>CERTIFICATION_VAULT // DECRYPTED</span>
                </div>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className={styles.grid}
            >
                {portfolioData.certifications.map((cert, index) => {
                    const uniqueKey = `${cert.id}-${index}`;
                    const isFlipped = flippedStatus[uniqueKey] || false;

                    return (
                        <motion.div variants={item} key={uniqueKey} className={styles.cardContainer}>
                            <div
                                className={`${styles.cardInternal} ${isFlipped ? styles.flipped : ''}`}
                                onClick={(e) => handleFlip(uniqueKey, e)}
                            >
                                {/* FRONT FACE */}
                                <div className={styles.cardFront}>
                                    <div className={styles.orgName}>{cert.organization}</div>
                                    <h3 className={styles.certName}>{cert.name}</h3>
                                    <p className={styles.certDesc}>{cert.description}</p>
                                    <div className={styles.issueDate}>ISSUED: {cert.issueDate}</div>

                                    <div className={styles.flipHint}>
                                        <CornerRightDown size={20} />
                                    </div>
                                </div>

                                {/* BACK FACE */}
                                <div className={styles.cardBack}>
                                    <div className={styles.previewImage}>
                                        <img
                                            src={cert.previewUrl}
                                            alt={cert.name}
                                            loading="lazy"
                                            onError={(e) => e.currentTarget.style.display = 'none'}
                                        />
                                    </div>
                                    <button
                                        className={styles.viewBtn}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            window.open(cert.pdfUrl, '_blank');
                                        }}
                                    >
                                        <ExternalLink size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                                        VIEW CERTIFICATE
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
}
