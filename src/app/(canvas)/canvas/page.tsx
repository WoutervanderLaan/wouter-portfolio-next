"use client";

import useThemeContext from "@/hooks/use-theme";
import dynamic from "next/dynamic";
import { useLayoutEffect } from "react";

const DrawingCanvas = dynamic(
    () => import("@/components/organisms/drawing-canvas/drawing-canvas"),
    {
        ssr: false,
    },
);

export default function Canvas() {
    const { isDarkMode, setDarkMode } = useThemeContext();

    useLayoutEffect(() => {
        if (isDarkMode) setDarkMode(false);
    }, [isDarkMode]);

    return <DrawingCanvas />;
}
