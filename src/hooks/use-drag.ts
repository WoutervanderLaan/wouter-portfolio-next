import { useCallback, useMemo, useRef } from "react";
import { useDrawingContext } from "./use-drawing-context";
import { ToolType } from "@/types/tool-type";

const useDrag = () => {
  const { type } = useDrawingContext();

  const isDragging = useRef(false);

  const draggable = useMemo(() => type === ToolType.DRAG, [type]);

  const onDragStart = useCallback(() => {
    isDragging.current = true;
  }, []);

  const onDragEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  return {
    draggable,
    onDragStart,
    onDragEnd,
    isDragging: isDragging.current,
  };
};

export default useDrag;
