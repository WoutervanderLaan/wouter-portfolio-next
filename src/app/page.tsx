"use client";

import ThemeToggleButton from "@/components/organisms/theme-toggle-button/theme-toggle-button";
import DrawingContextProvider from "@/context/drawing-context";
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
      <DrawingContextProvider>
        <DrawingCanvas />
      </DrawingContextProvider>
    </main>
  );
}
