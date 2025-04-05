"use client";

import dynamic from "next/dynamic";

const DrawingCanvas = dynamic(
  () => import("@/components/organisms/drawing-canvas/drawing-canvas"),
  {
    ssr: false,
  },
);

export default function Canvas() {
  return (
    <main>
      <DrawingCanvas />
    </main>
  );
}
