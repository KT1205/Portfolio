"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import styles from "./Skills.module.css";
import { portfolioData } from "@/data/portfolio";
import { Cpu, Globe, Database, PenTool, Hash } from "lucide-react";

type NodeData = {
    id: string;
    label: string;
    type: "core" | "category" | "skill";
    x: number;
    y: number;
    categoryId?: string;
    description?: string;
    profWidth?: number;
};

type LinkData = {
    source: string;
    target: string;
};

const getCategoryIcon = (cat: string) => {
    if (cat.includes("Web")) return <Globe size={20} />;
    if (cat.includes("Database")) return <Database size={20} />;
    if (cat.includes("Ecosystem")) return <PenTool size={20} />;
    return <Cpu size={20} />;
};

export default function Skills() {
    const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    // Calculate fixed radial positions for network graph
    const { nodes, links } = useMemo(() => {
        const generatedNodes: NodeData[] = [];
        const generatedLinks: LinkData[] = [];

        // Core Node
        generatedNodes.push({ id: "core", label: "NEXUS_CORE", type: "core", x: 50, y: 50 });

        const cats = portfolioData.skills;
        const catPositions = [
            { x: 25, y: 30 }, // Top Left
            { x: 75, y: 30 }, // Top Right
            { x: 25, y: 75 }, // Bottom Left
            { x: 75, y: 75 }, // Bottom Right
        ];

        cats.forEach((cat, i) => {
            const pos = catPositions[i] || { x: 50, y: 50 };
            const cx = pos.x;
            const cy = pos.y;

            const catId = `cat_${i}`;
            generatedNodes.push({ id: catId, label: cat.category, type: "category", x: cx, y: cy });
            generatedLinks.push({ source: "core", target: catId });

            const skillCount = cat.skills.length;
            const skillRadius = 15; // 15% distance from category center

            cat.skills.forEach((skill, j) => {
                const sAngle = (Math.PI * 2 * j) / skillCount; // Full circle around category
                // Adjust x/y scaling slightly to account for non-square viewport
                const sx = cx + (skillRadius * 0.8) * Math.cos(sAngle);
                const sy = cy + skillRadius * Math.sin(sAngle);

                const skillId = `skill_${i}_${j}`;

                generatedNodes.push({
                    id: skillId,
                    label: skill,
                    type: "skill",
                    x: sx,
                    y: sy,
                    categoryId: catId,
                    description: `Deployed across system architecture to process network demands.`,
                    profWidth: 60 + Math.random() * 40
                });
                generatedLinks.push({ source: catId, target: skillId });
            });
        });

        return { nodes: generatedNodes, links: generatedLinks };
    }, []);

    const isConnected = (source: string, target: string, hovered: string | null) => {
        if (!hovered) return true;
        if (source === hovered || target === hovered) return true;

        // Let's also light up sibling skills if category is hovered, etc.
        const hoveredNodeData = nodes.find(n => n.id === hovered);
        if (hoveredNodeData?.type === "category") {
            if (source === hovered || target === hovered) return true;
            if (source === "core" && target === hovered) return true;
        }
        if (hoveredNodeData?.type === "skill") {
            if (source === hoveredNodeData.categoryId || target === hovered) return true;
        }

        return false;
    };

    return (
        <section className={`section ${styles.skillsSection}`} id="skills">
            <motion.div
                className={styles.headerRow}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: customEase }}
            >
                <div className={styles.systemStatus}>
                    <div className={styles.pulseIndicator}></div>
                    <span>TECH_NETWORK // VISUALLY MAPPED</span>
                </div>
            </motion.div>

            <div className={styles.networkContainer}>
                {/* Desktop SVG Layout */}
                <div className={styles.desktopNetwork}>
                    {/* SVG Lines */}
                    <svg className={styles.svgLayer} width="100%" height="100%">
                        {links.map((link, i) => {
                            const sNode = nodes.find(n => n.id === link.source);
                            const tNode = nodes.find(n => n.id === link.target);
                            if (!sNode || !tNode) return null;

                            const active = isConnected(link.source, link.target, hoveredNode);

                            return (
                                <motion.line
                                    key={i}
                                    x1={`${sNode.x}%`} y1={`${sNode.y}%`}
                                    x2={`${tNode.x}%`} y2={`${tNode.y}%`}
                                    className={`${styles.edge} ${active ? styles.edgeActive : ''}`}
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 1, delay: 0.5 + i * 0.02 }}
                                />
                            );
                        })}
                    </svg>

                    {/* Nodes */}
                    {nodes.map((node, i) => {
                        const active = hoveredNode ?
                            (node.id === hoveredNode || node.categoryId === hoveredNode ||
                                (nodes.find(n => n.id === hoveredNode)?.categoryId === node.id))
                            : true;

                        return (
                            <motion.div
                                key={node.id}
                                className={`${styles.node} ${styles[node.type]} ${active ? styles.nodeActive : styles.nodeDimmed}`}
                                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: i * 0.05, type: 'spring' }}
                                onMouseEnter={() => setHoveredNode(node.id)}
                                onMouseLeave={() => setHoveredNode(null)}
                            >
                                <div className={styles.nodeGraphic}>
                                    {node.type === "core" && <Hash size={24} />}
                                    {node.type === "category" && getCategoryIcon(node.label)}
                                    {node.type === "skill" && <div className={styles.skillDot}></div>}
                                </div>
                                <span className={styles.nodeLabel}>{node.label}</span>

                            </motion.div>
                        );
                    })}
                </div>

                {/* Mobile Fallback Layout */}
                <div className={styles.mobileNetwork}>
                    {portfolioData.skills.map((cat, i) => (
                        <div key={i} className={styles.mobileCategoryCard}>
                            <div className={styles.mobileCatHeader}>
                                {getCategoryIcon(cat.category)}
                                <h3 className={styles.mobileCatTitle}>{cat.category}</h3>
                            </div>
                            <div className={styles.mobileSkillTags}>
                                {cat.skills.map((skill, j) => (
                                    <span key={j} className={styles.mobileSkillTag}>{skill}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
