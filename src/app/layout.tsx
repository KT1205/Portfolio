import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import CustomCursor from "@/components/CustomCursor";
import ParticleNetwork from "@/components/ParticleNetwork";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "Kalp Thekdi | Software Engineer",
  description: "A modern developer portfolio with cinematic animations, fluid scrolling, elegant typography, and a premium interactive experience.",
};

import { OSProvider } from "@/context/OSContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <link rel="prefetch" href="/resume.pdf" as="document" />
      </head>
      <body className={inter.className}>
        <div className="bg-gradients" aria-hidden="true">
          <div className="gradient-1"></div>
          <div className="gradient-2"></div>
        </div>
        <div className="noise-texture" aria-hidden="true" />
        <ThemeProvider>
          <OSProvider>
            <ParticleNetwork />
            <CustomCursor />
            {children}
          </OSProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
