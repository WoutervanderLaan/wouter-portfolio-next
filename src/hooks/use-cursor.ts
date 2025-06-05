import { Position } from "@/lib/types/position";
import { extractPoint } from "@/utils/drawing-helpers";
import Konva from "konva";
import { useCallback, useState } from "react";
import useDrawingContext from "./use-drawing-context";
import { ToolType } from "@/lib/types/tool-type";

const APPLICABLE_TOOLS = [ToolType.BRUSH, ToolType.ERASER];

const useCursor = () => {
  const [cursor, setCursor] = useState<Position | null>(null);

  const { type } = useDrawingContext();

  const handleCursor = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent | PointerEvent | TouchEvent>) => {
      if (!APPLICABLE_TOOLS.includes(type)) return setCursor(null);

      const point = extractPoint(e);

      setCursor({ x: point[0], y: point[1] });
    },
    [type],
  );

  const resetCursor = useCallback(() => setCursor(null), []);

  return { cursor, handleCursor, resetCursor };
};

export default useCursor;
