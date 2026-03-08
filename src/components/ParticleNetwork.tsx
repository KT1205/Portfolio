"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function EnvironmentLayer() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    const [isActive, setIsActive] = useState(false);
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 900;
            const lowPower = (navigator.hardwareConcurrency || 4) < 4;
            setIsMobile(mobile || lowPower);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile, { passive: true });
        // Defer rendering until active
        setTimeout(() => setIsActive(true), 100);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (!isActive || isMobile) return;

        // --- Particle & Mouse Logic ---
        const canvas = canvasRef.current;
        const grid = gridRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let particlesArray: Particle[] = [];
        let animationFrameId: number = 0;
        let isScrolling = false;
        let scrollTimeout: NodeJS.Timeout;

        // Smooth mouse following for parallax
        const mouse = {
            targetX: 0,
            targetY: 0,
            currentX: 0,
            currentY: 0,
            active: false
        };

        const handleResize = () => {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        let mouseRaf: number;
        const handleMouseMove = (event: MouseEvent) => {
            if (mouseRaf) cancelAnimationFrame(mouseRaf);
            mouseRaf = requestAnimationFrame(() => {
                mouse.targetX = (event.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
                mouse.targetY = (event.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
                mouse.active = true;
            });
        };

        const handleMouseLeave = () => {
            mouse.targetX = 0;
            mouse.targetY = 0;
            mouse.active = false;
        };

        const handleScroll = () => {
            isScrolling = true;
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
            }, 150);
        };

        window.addEventListener("resize", handleResize, { passive: true });
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
        window.addEventListener("scroll", handleScroll, { passive: true, capture: true });

        class Particle {
            x: number;
            y: number;
            directionX: number;
            directionY: number;
            size: number;
            alpha: number;
            zOffset: number; // For faux 3D parallax
            themeColor: string;

            constructor(x: number, y: number, directionX: number, directionY: number, size: number) {
                const isLight = document.documentElement.getAttribute("data-theme") === "light";
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.alpha = Math.random() * 0.5 + 0.1;
                this.zOffset = Math.random() * 2 + 0.5; // distance depth
                this.themeColor = isLight ? `rgba(0, 70, 243, ${this.alpha})` : `rgba(0, 245, 212, ${this.alpha})`;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                // Apply parallax translation based on mouse
                const px = this.x - mouse.currentX * 30 * this.zOffset;
                const py = this.y - mouse.currentY * 30 * this.zOffset;

                ctx.arc(px, py, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.themeColor;
                ctx.fill();
            }

            update() {
                if (!canvas) return;
                if (this.x > canvas.width + 100) this.x = -100;
                if (this.x < -100) this.x = canvas.width + 100;
                if (this.y > canvas.height + 100) this.y = -100;
                if (this.y < -100) this.y = canvas.height + 100;

                this.x += this.directionX;
                this.y += this.directionY;

                this.draw();
            }
        }

        function init() {
            if (!canvas) return;
            particlesArray = [];
            const numberOfParticles = 35; // Optimized for performance
            for (let i = 0; i < numberOfParticles; i++) {
                const size = Math.random() * 1.5 + 0.5;
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const directionX = (Math.random() * 0.4) - 0.2;
                const directionY = -Math.abs(Math.random() * 0.3 + 0.1); // Always float upwards slightly
                particlesArray.push(new Particle(x, y, directionX, directionY, size));
            }
        }

        function animate() {
            animationFrameId = requestAnimationFrame(animate);
            if (!ctx || !canvas || isScrolling) return;

            // Lerp mouse
            mouse.currentX += (mouse.targetX - mouse.currentX) * 0.05;
            mouse.currentY += (mouse.targetY - mouse.currentY) * 0.05;

            // Parallax the Grid Background
            if (gridRef.current) {
                // translate by up to 20px based on mouse
                const gx = mouse.currentX * -20;
                const gy = mouse.currentY * -20;
                gridRef.current.style.transform = `perspective(800px) rotateX(60deg) translateY(100px) translateZ(-200px) translate(${gx}px, ${gy}px)`;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
        }

        handleResize();
        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("scroll", handleScroll, { capture: true });
            cancelAnimationFrame(animationFrameId);
            if (mouseRaf) cancelAnimationFrame(mouseRaf);
        };
    }, [theme, isActive, isMobile]);

    if (isMobile) {
        return (
            <div style={{
                position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
                zIndex: -10, backgroundColor: "var(--bg-main)"
            }} />
        );
    }

    return (
        <div style={{
            position: "fixed",
            top: 0, left: 0,
            width: "100vw", height: "100vh",
            zIndex: -10,
            overflow: "hidden",
            pointerEvents: "none",
            backgroundColor: "var(--bg-main)"
        }}>
            {/* Dynamic Perspective Grid */}
            <div
                ref={gridRef}
                style={{
                    position: "absolute",
                    bottom: "-20%",
                    left: "-20%",
                    width: "140%",
                    height: "80vh",
                    backgroundImage: `
                        linear-gradient(to right, rgba(0, 245, 212, 0.05) 1px, transparent 1px),
                        linear-gradient(to top, rgba(0, 245, 212, 0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: "50px 50px",
                    maskImage: "linear-gradient(to top, rgba(0, 0, 0, 1), transparent)",
                    WebkitMaskImage: "linear-gradient(to top, rgba(0, 0, 0, 1), transparent)",
                    willChange: "transform"
                }}
            />
            {/* Cosmic Light Field */}
            <canvas
                ref={canvasRef}
                style={{
                    position: "absolute",
                    top: 0, left: 0, width: "100%", height: "100%"
                }}
            />
        </div>
    );
}
