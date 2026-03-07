import { useCallback, useMemo, useState } from "react";
import useCanvasStore from "./store-hooks/use-canvas-store";
import { ToolType } from "@/lib/types/tool-type";

const useDrag = () => {
  const { type } = useCanvasStore();

  const [isDragging, setIsDragging] = useState(false);

  const draggable = useMemo(() => type === ToolType.DRAG, [type]);

  const onDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const onDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  return {
    draggable,
    onDragStart,
    onDragEnd,
    isDragging,
  };
};

export default useDrag;
