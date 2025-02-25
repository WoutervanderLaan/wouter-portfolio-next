"use client";

import { DrawingContext } from "@/context/drawing-context";
import { useContext } from "react";

export const useDrawingContext = () => {
  const drawingContext = useContext(DrawingContext);

  if (!drawingContext) throw Error("Drawing context used outside provider");

  return drawingContext;
};
