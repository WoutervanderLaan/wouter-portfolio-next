"use client";

import ThemeToggleButton from "@/components/organisms/theme-toggle-button/theme-toggle-button";
import dynamic from "next/dynamic";

const DrawingCanvas = dynamic(
  () => import("@/components/organisms/drawing-canvas/drawing-canvas"),
  {
    ssr: false,
  },
);

export default function Home() {
  return (
    <main>
      <ThemeToggleButton className="sm:hidden" />
      <DrawingCanvas debugMode />
    </main>
  );
}
