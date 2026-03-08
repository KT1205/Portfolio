"use client";

import { motion, AnimatePresence } from "framer-motion";
import styles from "./CenterViewport.module.css";
import { useOS } from "@/context/OSContext";

import dynamic from "next/dynamic";

// Lazy load modules to improve initialization performance
const Hero = dynamic(() => import("@/components/Hero/Hero"));
const Projects = dynamic(() => import("@/components/Projects/Projects"));
const Experience = dynamic(() => import("@/components/Experience/Experience"));
const Skills = dynamic(() => import("@/components/Skills/Skills"));
const Contact = dynamic(() => import("@/components/Contact/Contact"));
const Certifications = dynamic(() => import("@/components/Certifications/Certifications"));

export default function CenterViewport() {
    const { activeModule } = useOS();

    const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

    // Removed expensive blur filters, using translate3d to offload to GPU
    const variants = {
        initial: { opacity: 0, transform: "translate3d(0, 10px, 0)", scale: 0.98 },
        animate: { opacity: 1, transform: "translate3d(0, 0px, 0)", scale: 1, transition: { duration: 0.4, ease: customEase } },
        exit: { opacity: 0, transform: "translate3d(0, -10px, 0)", scale: 1.02, transition: { duration: 0.2, ease: customEase } }
    };

    const renderModule = () => {
        switch (activeModule) {
            case "CORE_IDENTITY": return <Hero key="hero" />;
            case "PROJECT_MATRIX": return <Projects key="projects" />;
            case "EXPERIENCE_LOG": return <Experience key="experience" />;
            case "TECH_NETWORK": return <Skills key="skills" />;
            case "CERTIFICATION_VAULT": return <Certifications key="certs" />;
            case "CONTACT_NODE": return <Contact key="contact" />;
            default: return <Hero key="hero" />;
        }
    };

    return (
        <div className={styles.viewportContainer}>
            <div className={styles.topBar}>
                <div className={styles.statusGroup}>
                    <div className={styles.dot}></div>
                    <span>SYS_ACTIVE</span>
                </div>
                <div className={styles.scanLine}></div>
                <span className={styles.moduleName}>{activeModule}</span>
            </div>

            {/* Global Transition Glitch Overlay — lives in viewportContainer (overflow:hidden) NOT scrollArea */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeModule + "_transition"}
                    initial={{ top: "-2px", opacity: 0, height: "2px" }}
                    animate={{ top: "100%", opacity: [0, 1, 1, 0], height: "2px" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "linear" }}
                    className={styles.transitionScanLine}
                />
            </AnimatePresence>

            <div className={styles.scrollArea}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeModule}
                        className={styles.moduleWrapper}
                        variants={variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        {renderModule()}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Viewport UI Overlay */}
            <div className={styles.cornerTls}></div>
            <div className={styles.cornerTrs}></div>
            <div className={styles.cornerBls}></div>
            <div className={styles.cornerBrs}></div>
        </div>
    );
}
