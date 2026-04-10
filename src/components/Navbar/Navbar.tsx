"use client";

import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import styles from "./Navbar.module.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            className={`${styles.navbar} ${scrolled ? styles.glass : ""}`}
            initial={{ y: -50, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className={`container ${styles.navContainer}`}>
                <Link href="/" className={styles.logo}>
                    {portfolioData.name.split(" ")[0]}
                </Link>

                <div className={styles.navLinks}>
                    <Link href="#about" className={styles.navLink}>About</Link>
                    <Link href="#projects" className={styles.navLink}>Work</Link>
                    <Link href="#experience" className={styles.navLink}>Experience</Link>
                    <Link href="#contact" className={styles.navLink}>Contact</Link>
                </div>
            </div>
        </motion.nav>
    );
}
