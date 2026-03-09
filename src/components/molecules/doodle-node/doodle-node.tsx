"use client";

import { DoodleNodeData } from "@/lib/types/board";
import { Rect, Line, Group } from "react-konva";
import { smoothPoints } from "@/utils/drawing-helpers";

interface DoodleNodeProps {
  width: number;
  height: number;
  data: DoodleNodeData;
  isEditing: boolean;
  onDoubleClick: () => void;
}

const DoodleNode = ({
  width,
  height,
  data,
  isEditing,
  onDoubleClick,
}: DoodleNodeProps) => {
  return (
    <Group onDblClick={onDoubleClick} onDblTap={onDoubleClick}>
      {/* Canvas background */}
      <Rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="#FAFAFA"
        cornerRadius={8}
        stroke={isEditing ? "#8B5CF6" : undefined}
        strokeWidth={isEditing ? 2 : 0}
        dash={isEditing ? [4, 4] : undefined}
      />

      {/* Grid dots for doodle paper feel */}
      {Array.from({ length: Math.floor(width / 20) }).map((_, col) =>
        Array.from({ length: Math.floor(height / 20) }).map((_, row) => (
          <Rect
            key={`dot-${col}-${row}`}
            x={10 + col * 20}
            y={10 + row * 20}
            width={1}
            height={1}
            fill="#D1D5DB"
          />
        )),
      )}

      {/* Render existing lines scaled to node size */}
      {data.lines.map((line, i) => {
        const scaleX = width / data.canvasWidth;
        const scaleY = height / data.canvasHeight;
        const scaledPoints = line.points.map((p, idx) =>
          idx % 2 === 0 ? p * scaleX : p * scaleY,
        );
        const smoothed = smoothPoints(scaledPoints);

        return (
          <Line
            key={`doodle-line-${i}`}
            points={smoothed}
            stroke={line.color}
            strokeWidth={line.size * Math.min(scaleX, scaleY)}
            opacity={line.opacity / 100}
            tension={0.5}
            lineCap="round"
            lineJoin="round"
            globalCompositeOperation={
              line.type === 1 ? "destination-out" : "source-over"
            }
          />
        );
      })}
    </Group>
  );
};

export default DoodleNode;
