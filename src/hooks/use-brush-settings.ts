import { ToolType } from "@/lib/types/tool-type";
import { useRef, useState } from "react";

export const MAX_COLOR_HISTORY = 8;

const useBrushSettings = () => {
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(5);
  const [opacity, setOpacity] = useState(100);
  const [type, setType] = useState<ToolType>(ToolType.BRUSH);
  const colorHistoryRef = useRef<Array<string>>([]);

  return {
    color,
    setColor,
    size,
    setSize,
    opacity,
    setOpacity,
    type,
    setType,
    colorHistoryRef,
  };
};

export default useBrushSettings;
