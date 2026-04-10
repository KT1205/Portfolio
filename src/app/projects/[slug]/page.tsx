"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Github } from "lucide-react";
import styles from "./ProjectDetail.module.css";
import { use } from "react";

import { portfolioData } from "@/data/portfolio";

export default function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
    const unwrappedParams = use(params);
    const slug = unwrappedParams.slug;
    const project = portfolioData.projects.find(p => p.slug === slug);

    if (!project) {
        return (
            <div className={`container ${styles.container}`} style={{ textAlign: "center", paddingTop: "20vh" }}>
                <h1 className={styles.title}>Project Not Found</h1>
                <Link href="/#projects" className={styles.backBtn}>
                    <ArrowLeft size={20} /> Back to Projects
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className="container">
                <Link href="/#projects" className={styles.backBtn}>
                    <ArrowLeft size={20} /> Back to Projects
                </Link>

                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className={styles.title}>{project.title}</h1>
                    <h2 className={styles.subtitle}>{project.subtitle}</h2>

                    <div className={styles.techStack}>
                        {project.technologies.map(tech => (
                            <span key={tech} className={styles.techTag}>{tech}</span>
                        ))}
                    </div>

                    <div className={styles.links}>
                        {project.github === "https://github.com" ? (
                            <Link href="/status" className={styles.primaryBtn}>
                                <Github size={20} /> View Code
                            </Link>
                        ) : (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.primaryBtn}>
                                <Github size={20} /> View Code
                            </a>
                        )}
                    </div>
                </motion.div>

                <motion.div
                    className={styles.content}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {project.overview && (
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>Overview</h3>
                            <p className={styles.paragraph}>{project.overview}</p>
                        </div>
                    )}

                    {project.architecture && (
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>Architecture Explanation</h3>
                            <p className={styles.paragraph}>{project.architecture}</p>
                        </div>
                    )}

                    {project.challenges && project.challenges.length > 0 && (
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>Key Challenges</h3>
                            <ul className={styles.list}>
                                {project.challenges.map((challenge, index) => (
                                    <li key={index} className={styles.listItem}>{challenge}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {project.lessons && (
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>Lessons Learned</h3>
                            <p className={styles.paragraph}>{project.lessons}</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
