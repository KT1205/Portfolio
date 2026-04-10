"use client";

import { useState, useEffect } from "react";
import BootSequence from "@/components/BootSequence";
import LeftPanel from "@/components/OS/LeftPanel";
import CenterViewport from "@/components/OS/CenterViewport";
import GlobalTerminal from "@/components/OS/GlobalTerminal";
import SystemStatusBar from "@/components/OS/SystemStatusBar";

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent SSR mismatch

  return (
    <main className="os-desktop">
      {!bootComplete ? (
        <BootSequence onComplete={() => setBootComplete(true)} />
      ) : (
        <>
          <LeftPanel />
          <div className="os-content-area">
            <CenterViewport />
          </div>
          <GlobalTerminal />
          <SystemStatusBar />
        </>
      )}
    </main>
  );
}
