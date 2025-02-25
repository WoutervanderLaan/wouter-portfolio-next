import { ToolType } from "@/types/tool-type";
import { useRef, useState } from "react";

export const MAX_COLOR_HISTORY = 8;

const useBrushSettings = () => {
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(5);
  const [opacity, setOpacity] = useState(100);
  const [type, setType] = useState<ToolType>(ToolType.BRUSH);
  const colorHistoryRef = useRef<Array<string>>([]);

  const adjustColor = (newColor: string) => {
    if (!colorHistoryRef.current.includes(color))
      colorHistoryRef.current = [color, ...colorHistoryRef.current].slice(
        0,
        MAX_COLOR_HISTORY,
      );
    setColor(newColor);
  };

  return {
    color,
    adjustColor,
    size,
    setSize,
    opacity,
    setOpacity,
    type,
    setType,
    colorHistory: colorHistoryRef.current,
  };
};

export default useBrushSettings;
