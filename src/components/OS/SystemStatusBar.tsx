"use client";

import { useEffect, useState } from "react";
import styles from "./SystemStatusBar.module.css";
import { useOS } from "@/context/OSContext";
import { portfolioData } from "@/data/portfolio";

export default function SystemStatusBar() {
    const { activeModule } = useOS();
    const [time, setTime] = useState<string>("");

    const projectsCount = portfolioData.projects.length;
    const skillsCount = portfolioData.skills.reduce((acc, cat) => acc + cat.skills.length, 0);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.statusBar}>
            <div className={styles.statusGroup}>
                <div className={styles.dotOnline}></div>
                <span className={styles.statusText}>SYSTEM_STATUS: ONLINE</span>
            </div>

            <div className={styles.statusGroup}>
                <span className={styles.statusText}>NODE_CONNECTION: STABLE</span>
            </div>

            <div className={`${styles.statusGroup} ${styles.hideMobile}`}>
                <span className={styles.statusText}>PROJECTS_DEPLOYED: {projectsCount}</span>
            </div>

            <div className={`${styles.statusGroup} ${styles.hideMobile}`}>
                <span className={styles.statusText}>TECH_STACKS: {skillsCount}</span>
            </div>

            <div className={styles.activeModuleIndicator}>
                [ <span className={styles.moduleName}>{activeModule}</span> ]
            </div>

            <div className={styles.statusGroup}>
                <span className={styles.clockText}>T-MINUS // {time || "00:00:00"}</span>
            </div>
        </div>
    );
}
