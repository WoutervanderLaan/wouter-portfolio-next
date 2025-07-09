"use client";

import { Stage } from "konva/lib/Stage";
import { ReactNode, RefObject, createContext, useRef } from "react";

type StageContext = {
    stageRef: RefObject<Stage | null>;
};

export const StageContext = createContext<StageContext | null>(null);

const StageProvider = ({ children }: { children: ReactNode }) => {
    const stageRef = useRef<Stage | null>(null);

    return (
        <StageContext.Provider value={{ stageRef }}>
            {children}
        </StageContext.Provider>
    );
};

export default StageProvider;
