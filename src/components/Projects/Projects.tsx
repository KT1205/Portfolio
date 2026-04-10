"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Github, Box, X, TerminalSquare } from "lucide-react";
import styles from "./Projects.module.css";
import { portfolioData } from "@/data/portfolio";

export default function Projects() {
    const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
    const [activeProject, setActiveProject] = useState<string | null>(null);

    const handleOpenProject = (id: string) => {
        // Option to play sound here
        setActiveProject(id);
    };

    const handleCloseProject = () => {
        setActiveProject(null);
    };

    return (
        <section className={`section ${styles.projectsSection}`} id="projects">
            <motion.div
                className={styles.headerRow}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: customEase }}
            >
                <div className={styles.systemStatus}>
                    <div className={styles.pulseIndicator}></div>
                    <span>PROJECT_MATRIX // ONLINE</span>
                </div>
            </motion.div>

            <div className={styles.projectGrid}>
                {portfolioData.projects.map((project, index) => (
                    <ProjectNode
                        key={project.id}
                        project={project}
                        index={index}
                        onClick={() => handleOpenProject(project.id)}
                    />
                ))}
            </div>

            <AnimatePresence>
                {activeProject && (
                    <ProjectModal
                        project={portfolioData.projects.find(p => p.id === activeProject)!}
                        onClose={handleCloseProject}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}

type ProjectData = { id: string, title: string, subtitle: string, description: string, technologies: string[], github: string, slug: string };

function ProjectNode({ project, index, onClick }: { project: ProjectData, index: number, onClick: () => void }) {
    return (
        <motion.div
            className={styles.nodeWrapper}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            onClick={onClick}
        >
            <div className={styles.nodeBox}>
                <div className={styles.nodeHeader}>
                    <div className={styles.headerLine}></div>
                    <Box size={14} className={styles.nodeIcon} />
                    <span className={styles.nodeId}>ARCHIVE_ID // {project.id.toUpperCase()}</span>
                    <span className={styles.statusBadge}>ACTIVE</span>
                </div>
                
                <div className={styles.contentBody}>
                    <h3 className={styles.nodeTitle}>{project.title}</h3>
                    <div className={styles.metaRow}>
                        <span className={styles.metaLabel}>DEPLOYMENT_MODULE</span>
                        <div className={styles.nodeTech}>
                            {project.technologies.slice(0, 3).map((t: string) => <span key={t}>{t}</span>)}
                        </div>
                    </div>
                </div>

                <div className={styles.cardFooter}>
                    <span className={styles.footerTag}>ACCESS_PORT_v2.0</span>
                    <div className={styles.energyPulse}></div>
                </div>
            </div>

            {/* Subtle external corner brackets */}
            <div className={styles.bracketTl}></div>
            <div className={styles.bracketBr}></div>
        </motion.div>
    );
}

function ProjectModal({ project, onClose }: { project: ProjectData, onClose: () => void }) {
    const [decrypted, setDecrypted] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const timer = setTimeout(() => {
            setDecrypted(true);
        }, 600); // Decryption time
        return () => clearTimeout(timer);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
        >
            <motion.div
                className={styles.modalContainer}
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* Scanning effect line */}
                <div className={styles.modalScanner}></div>

                <div className={styles.modalHeader}>
                    <div className={styles.modalStatus}>
                        <TerminalSquare size={16} />
                        <span>DECRYPTING_{project.id.toUpperCase()}</span>
                    </div>
                    <button className={styles.closeBtn} onClick={onClose} aria-label="Close module">
                        <X size={20} />
                    </button>
                </div>

                {!decrypted ? (
                    <div className={styles.decryptionAnim}>
                        <div className={styles.glitchText}>ACCESSING SECURE DATA...</div>
                        <div className={styles.decryptionBar}>
                            <motion.div
                                className={styles.decryptionFill}
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 0.5, ease: "linear" }}
                            />
                        </div>
                    </div>
                ) : (
                    <motion.div
                        className={styles.modalContent}
                        initial={{ opacity: 0, filter: "blur(5px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        transition={{ duration: 0.4 }}
                    >
                        <h2 className={styles.modalTitle}>{project.title}</h2>
                        <h3 className={styles.modalSubtitle}>{project.subtitle}</h3>

                        <p className={styles.modalDesc}>{project.description}</p>

                        <div className={styles.modalTech}>
                            {project.technologies.map(tech => (
                                <span key={tech} className={styles.modalTechTag}>{tech}</span>
                            ))}
                        </div>

                        <div className={styles.modalActions}>
                            <Link href={`/projects/${project.slug}`} className={styles.actionBtnPrimary}>
                                [ INITIATE FULL MODULE ]
                            </Link>
                            <div className={styles.actionLinks}>
                                {project.github && (
                                    project.github === "https://github.com" ? (
                                        <Link href="/status" className={styles.iconBtn}>
                                            <Github size={18} /> Source
                                        </Link>
                                    ) : (
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.iconBtn}>
                                            <Github size={18} /> Source
                                        </a>
                                    )
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>,
        document.body
    );
}
