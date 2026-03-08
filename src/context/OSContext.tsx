"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type ModuleType = "CORE_IDENTITY" | "PROJECT_MATRIX" | "EXPERIENCE_LOG" | "TECH_NETWORK" | "CERTIFICATION_VAULT" | "CONTACT_NODE";

interface OSContextType {
    activeModule: ModuleType;
    setActiveModule: (module: ModuleType) => void;
    isTerminalOpen: boolean;
    setTerminalOpen: (isOpen: boolean) => void;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

export function OSProvider({ children }: { children: ReactNode }) {
    const [activeModule, setActiveModule] = useState<ModuleType>("CORE_IDENTITY");
    const [isTerminalOpen, setTerminalOpen] = useState(false);

    return (
        <OSContext.Provider value={{ activeModule, setActiveModule, isTerminalOpen, setTerminalOpen }}>
            {children}
        </OSContext.Provider>
    );
}

export function useOS() {
    const context = useContext(OSContext);
    if (!context) {
        throw new Error("useOS must be used within an OSProvider");
    }
    return context;
}
