"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import { sysSound } from "@/utils/sound";

export default function CustomCursor() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring configuration for liquid-smooth performance
    const springConfig = { stiffness: 450, damping: 30, mass: 0.1 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const { theme } = useTheme();

    const isLight = theme === "light";
    const mainColor = isLight ? "rgba(17, 17, 17, 1)" : "rgba(0, 245, 212, 1)";
    const targetColor = isLight ? "rgba(0, 112, 243, 0.8)" : "rgba(0, 245, 212, 0.8)";

    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        setIsMobile(window.innerWidth < 900);
        const handleResize = () => setIsMobile(window.innerWidth < 900);
        window.addEventListener("resize", handleResize, { passive: true });

        if (window.innerWidth < 900) return;

        // Init sound engine on first interaction
        const initAudio = () => {
            if (sysSound) sysSound.init();
            window.removeEventListener("mousemove", initAudio);
            window.removeEventListener("click", initAudio);
        };
        window.addEventListener("mousemove", initAudio);
        window.addEventListener("click", initAudio);

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable =
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button" ||
                target.closest("a") ||
                target.closest("button") ||
                window.getComputedStyle(target).cursor === "pointer";

            if (isClickable) {
                if (!isHovering) {
                    setIsHovering(true);
                    if (sysSound) sysSound.hover();
                }
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseDown = () => {
            setIsClicking(true);
            if (sysSound) sysSound.click();
        };

        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("mouseover", handleMouseOver, { passive: true });
        window.addEventListener("mousedown", handleMouseDown, { passive: true });
        window.addEventListener("mouseup", handleMouseUp, { passive: true });

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isHovering]);

    if (isMobile) return null;

    return (
        <>
            {/* Center Dot */}
            <motion.div
                className="cursor-dot"
                style={{
                    left: springX,
                    top: springY,
                }}
                animate={{
                    scale: isClicking ? 0.5 : (isHovering ? 0 : 1),
                    backgroundColor: mainColor
                }}
            />

            {/* Target Lock Brackets Layer */}
            <motion.div
                className="cursor-target"
                style={{
                    left: springX,
                    top: springY,
                }}
                animate={{
                    scale: isHovering ? (isClicking ? 0.9 : 1.2) : 0.5,
                    opacity: isHovering ? 1 : 0,
                    rotate: isHovering ? 0 : 45
                }}
            >
                <div className="target-tl" style={{ borderColor: targetColor }}></div>
                <div className="target-tr" style={{ borderColor: targetColor }}></div>
                <div className="target-bl" style={{ borderColor: targetColor }}></div>
                <div className="target-br" style={{ borderColor: targetColor }}></div>
            </motion.div>

            {/* Outer Ring for idle */}
            <motion.div
                className="cursor-ring"
                style={{
                    left: springX,
                    top: springY,
                }}
                animate={{
                    scale: isHovering ? 0 : (isClicking ? 0.8 : 1),
                    opacity: isHovering ? 0 : 1,
                    borderColor: isLight ? "rgba(17, 17, 17, 0.3)" : "rgba(255, 255, 255, 0.2)"
                }}
            />

            <motion.div
                className="cursor-glow"
                style={{
                    left: springX,
                    top: springY,
                }}
                animate={{
                    opacity: isHovering ? 1 : 0,
                }}
            />

            <style jsx global>{`
                .cursor-dot {
                    position: fixed;
                    width: 6px; height: 6px;
                    margin-left: -3px; margin-top: -3px;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 10000;
                }
                .cursor-target {
                    position: fixed;
                    width: 30px; height: 30px;
                    margin-left: -15px; margin-top: -15px;
                    pointer-events: none;
                    z-index: 9999;
                    display: flex;
                    justify-content: space-between;
                    align-content: space-between;
                    flex-wrap: wrap;
                }
                .target-tl, .target-tr, .target-bl, .target-br {
                    width: 8px; height: 8px;
                    border-style: solid;
                    border-width: 0;
                }
                .target-tl { border-top-width: 2px; border-left-width: 2px; }
                .target-tr { border-top-width: 2px; border-right-width: 2px; }
                .target-bl { border-bottom-width: 2px; border-left-width: 2px; }
                .target-br { border-bottom-width: 2px; border-right-width: 2px; }
                
                .cursor-ring {
                    position: fixed;
                    width: 24px; height: 24px;
                    margin-left: -12px; margin-top: -12px;
                    border-radius: 50%;
                    border: 1px solid transparent; 
                    pointer-events: none;
                    z-index: 9999;
                }
                .cursor-glow {
                    position: fixed;
                    width: 160px; height: 160px;
                    margin-left: -80px; margin-top: -80px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(0, 245, 212, 0.15) 0%, transparent 60%);
                    pointer-events: none;
                    z-index: 9998;
                    filter: blur(20px);
                }
                @media (max-width: 768px) {
                    .cursor-dot, .cursor-ring, .cursor-target, .cursor-glow {
                        display: none;
                    }
                }
            `}</style>
        </>
    );
}
