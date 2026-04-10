"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Skills.module.css";
import { portfolioData } from "@/data/portfolio";
import { 
    Cpu, Globe, Database, PenTool, Terminal, 
    Activity, ChevronRight, Hash, Box, Settings, Layers
} from "lucide-react";

const getCategoryIcon = (cat: string) => {
    const name = cat.toLowerCase();
    if (name.includes("web")) return <Globe size={18} />;
    if (name.includes("data")) return <Database size={18} />;
    if (name.includes("eco") || name.includes("tool")) return <PenTool size={18} />;
    if (name.includes("prog")) return <Terminal size={24} />;
    return <Cpu size={18} />;
};

export default function Skills() {
    const [activeIndex, setActiveIndex] = useState(0);
    const categories = portfolioData.skills;
    const activeCategory = categories[activeIndex];

    return (
        <section className={styles.nexusSection} id="skills">
            <div className={styles.consoleFrame}>
                {/* Header Meta */}
                <div className={styles.consoleHeader}>
                    <div className={styles.systemIdentifier}>
                        <div className={styles.statusLamp}></div>
                        <span className={styles.systemTag}>SUBSYSTEM_INSPECTOR_v4.0.2</span>
                    </div>
                    <div className={styles.sessionMeta}>
                        <span>AUTH: ROOT_USER</span>
                        <span className={styles.divider}>|</span>
                        <span>NODE: NEXUS_SERVER</span>
                    </div>
                </div>

                <div className={styles.consoleMain}>
                    {/* Left Rail: Subsystem Index */}
                    <div className={styles.subsystemRail}>
                        <div className={styles.railHeader}>
                            <Layers size={14} />
                            <span>INDEX</span>
                        </div>
                        <div className={styles.railItems}>
                            {categories.map((cat, i) => (
                                <button 
                                    key={cat.category}
                                    className={`${styles.railItem} ${i === activeIndex ? styles.railActive : ''}`}
                                    onClick={() => setActiveIndex(i)}
                                >
                                    <div className={styles.railNum}>0{i + 1}</div>
                                    <div className={styles.railLabel}>
                                        <span className={styles.railCategory}>{cat.category.toUpperCase()}</span>
                                        <span className={styles.railStatus}>ACTIVE_LOGIC</span>
                                    </div>
                                    {i === activeIndex && (
                                        <motion.div 
                                            layoutId="activePointer"
                                            className={styles.activePointer}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                        <div className={styles.railFooter}>
                            <Settings size={14} />
                            <span>v2.8.4_STABLE</span>
                        </div>
                    </div>

                    {/* Right Console: Detailed Specs */}
                    <div className={styles.detailConsole}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory.category}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                className={styles.consoleContent}
                            >
                                <div className={styles.contentHeader}>
                                    <div className={styles.catInfo}>
                                        <div className={styles.catMeta}>
                                            <h2 className={styles.catTitle}>{activeCategory.category.toUpperCase()}</h2>
                                            <div className={styles.catPath}>SYSTEM_CORE / {activeCategory.category.toUpperCase()}</div>
                                        </div>
                                    </div>
                                    <div className={styles.moduleCount}>
                                        <Hash size={12} />
                                        <span>MODULES: {activeCategory.skills.length}</span>
                                    </div>
                                </div>

                                <div className={styles.skillGrid}>
                                    {activeCategory.skills.map((skill, i) => (
                                        <div key={skill} className={styles.skillBlock}>
                                            <div className={styles.blockHead}>
                                                <span className={styles.blockUid}>MOD-{(activeIndex + 1) * 100 + i}</span>
                                                <Activity size={12} className={styles.activityIcon} />
                                            </div>
                                            <div className={styles.blockBody}>
                                                <h3 className={styles.skillName}>{skill}</h3>
                                                <div className={styles.barContainer}>
                                                    <div className={styles.barSegments}>
                                                        {[...Array(12)].map((_, idx) => (
                                                            <div 
                                                                key={idx} 
                                                                className={`${styles.barSegment} ${idx < (activeCategory.category.length % 5) + 7 ? styles.segActive : ''}`}
                                                            ></div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.blockStatus}>
                                                <div className={styles.statusDot}></div>
                                                <span>SYSTEM_STABLE</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
