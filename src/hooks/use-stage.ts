"use client";

import { StageContext } from "@/context/stage-context";
import { useContext } from "react";

export const useStage = () => {
    const stageContext = useContext(StageContext);

    if (!stageContext) throw new Error("useStage is used outside Provider.");

    return stageContext;
};
