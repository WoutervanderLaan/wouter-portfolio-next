import { useMemo } from "react";
import useCanvasStore from "./store-hooks/use-canvas-store";

const useHistory = () => {
  const { layers, images, redoStack, undo, redo, resetRedoStack } =
    useCanvasStore();

  const noHistory = useMemo(
    () =>
      layers.every((layer) => !layer.lines.length) && images.length === 0,
    [layers, images],
  );

  return { undo, redo, resetRedoStack, noHistory, redoStack };
};

export default useHistory;
