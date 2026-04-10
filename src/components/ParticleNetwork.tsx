"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function EnvironmentLayer() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    const [isActive, setIsActive] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile, { passive: true });

        const timer = setTimeout(() => setIsActive(true), 200);
        return () => {
            window.removeEventListener("resize", checkMobile);
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        if (!isActive || isMobile) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        let particlesArray: Particle[] = [];
        let animationFrameId: number;
        let isScrolling = false;
        let scrollTimeout: NodeJS.Timeout;

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

        const handleMouseMove = (event: MouseEvent) => {
            mouse.targetX = (event.clientX / window.innerWidth - 0.5) * 2;
            mouse.targetY = (event.clientY / window.innerHeight - 0.5) * 2;
            mouse.active = true;
        };

        const handleScroll = () => {
            isScrolling = true;
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
            }, 100);
        };

        window.addEventListener("resize", handleResize, { passive: true });
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("scroll", handleScroll, { passive: true });

        class Particle {
            x: number; y: number;
            directionX: number; directionY: number;
            size: number; alpha: number; zOffset: number;
            color: string;

            constructor(x: number, y: number, directionX: number, directionY: number, size: number) {
                const isLight = document.documentElement.getAttribute("data-theme") === "light";
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.alpha = Math.random() * 0.4 + 0.1;
                this.zOffset = Math.random() * 1.5 + 0.5;
                this.color = isLight ? `rgba(37, 99, 235, ${this.alpha})` : `rgba(0, 245, 212, ${this.alpha})`;
            }

            draw() {
                if (!ctx) return;
                const px = this.x - mouse.currentX * 15 * this.zOffset;
                const py = this.y - mouse.currentY * 15 * this.zOffset;

                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(px, py, this.size, 0, Math.PI * 2);
                ctx.fill();
            }

            update() {
                if (!canvas) return;
                this.x += this.directionX;
                this.y += this.directionY;

                if (this.x > canvas.width + 50) this.x = -50;
                else if (this.x < -50) this.x = canvas.width + 50;
                if (this.y > canvas.height + 50) this.y = -50;
                else if (this.y < -50) this.y = canvas.height + 50;

                this.draw();
            }
        }

        function init() {
            if (!canvas) return;
            particlesArray = [];
            const count = 30;
            for (let i = 0; i < count; i++) {
                const size = Math.random() * 1.2 + 0.3;
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const dx = (Math.random() * 0.2) - 0.1;
                const dy = (Math.random() * 0.2) - 0.1;
                particlesArray.push(new Particle(x, y, dx, dy, size));
            }
        }

        function animate() {
            animationFrameId = requestAnimationFrame(animate);
            if (!ctx || !canvas || isScrolling) return;

            ctx.fillStyle = theme === 'dark' ? '#050508' : '#f8fafc';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            mouse.currentX += (mouse.targetX - mouse.currentX) * 0.05;
            mouse.currentY += (mouse.targetY - mouse.currentY) * 0.05;

            if (gridRef.current) {
                const gx = mouse.currentX * -10;
                const gy = mouse.currentY * -10;
                gridRef.current.style.transform = `perspective(1000px) rotateX(60deg) translate3d(${gx}px, ${gy}px, 0)`;
            }

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
        }

        handleResize();
        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme, isActive, isMobile]);

    return (
        <div style={{
            position: "fixed",
            inset: 0,
            zIndex: -10,
            overflow: "hidden",
            pointerEvents: "none",
            backgroundColor: "var(--bg-main)"
        }}>
            <div
                ref={gridRef}
                style={{
                    position: "absolute",
                    bottom: "-10%",
                    left: "-10%",
                    width: "120%",
                    height: "60vh",
                    backgroundImage: `
                        linear-gradient(to right, ${theme === 'light' ? 'rgba(0, 112, 243, 0.04)' : 'rgba(0, 245, 212, 0.05)'} 1px, transparent 1px),
                        linear-gradient(to top, ${theme === 'light' ? 'rgba(0, 112, 243, 0.04)' : 'rgba(0, 245, 212, 0.05)'} 1px, transparent 1px)
                    `,
                    backgroundSize: isMobile ? "40px 40px" : "60px 60px",
                    transform: "perspective(1000px) rotateX(60deg)",
                    maskImage: "linear-gradient(to top, rgba(0, 0, 0, 1), transparent)",
                    WebkitMaskImage: "linear-gradient(to top, rgba(0, 0, 0, 1), transparent)",
                    willChange: isMobile ? "auto" : "transform",
                    transition: "transform 0.1s linear"
                }}
            />

            {isMobile && (
                <>
                    <div style={{
                        position: "absolute", top: "10%", left: "10%",
                        width: "80vw", height: "80vw",
                        background: "radial-gradient(circle, rgba(121, 40, 202, 0.08) 0%, transparent 70%)",
                        filter: "blur(60px)"
                    }} />
                    <div style={{
                        position: "absolute", bottom: "10%", right: "10%",
                        width: "80vw", height: "80vw",
                        background: "radial-gradient(circle, rgba(0, 245, 212, 0.08) 0%, transparent 70%)",
                        filter: "blur(60px)"
                    }} />
                </>
            )}

            {!isMobile && (
                <canvas
                    ref={canvasRef}
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%"
                    }}
                />
            )}
        </div>
    );
}
