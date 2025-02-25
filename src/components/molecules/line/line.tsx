import { TLine } from "@/types/line";
import { ToolType } from "@/types/tool-type";
import { Line as KonvaLine } from "react-konva";

const Line = ({ size, points, color, opacity, type }: TLine) => (
  <KonvaLine
    points={points}
    stroke={color}
    strokeWidth={size}
    opacity={opacity}
    tension={1}
    globalCompositeOperation={
      type === ToolType.ERASER ? "destination-out" : "source-over"
    }
    lineCap="round"
    lineJoin="round"
  />
);

export default Line;
