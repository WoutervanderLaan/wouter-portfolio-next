"use client";

import useThemeContext from "@/hooks/use-theme";
import dynamic from "next/dynamic";
import { useLayoutEffect } from "react";

const BoardCanvas = dynamic(
  () => import("@/components/organisms/board-canvas/board-canvas"),
  {
    ssr: false,
  },
);

export default function Canvas() {
  const { isDarkMode, setDarkMode } = useThemeContext();

  useLayoutEffect(() => {
    if (isDarkMode) setDarkMode(false);
  }, [isDarkMode]);

  return <BoardCanvas />;
}
