"use client";

import {
  BoardNode as BoardNodeType,
  DoodleNodeData,
} from "@/lib/types/board";
import { Rect, Line, Group, Text } from "react-konva";
import { smoothPoints } from "@/utils/drawing-helpers";
import { TLine } from "@/lib/types/line";
import { ToolType } from "@/lib/types/tool-type";
import { useRef, useCallback, useEffect } from "react";
import { KonvaEventObject } from "konva/lib/Node";

interface DoodleNodeProps {
  node: BoardNodeType;
  data: DoodleNodeData;
  isEditing: boolean;
  onStartEdit: () => void;
  onUpdateLines: (lines: TLine[]) => void;
}

const DoodleNode = ({
  node,
  data,
  isEditing,
  onStartEdit,
  onUpdateLines,
}: DoodleNodeProps) => {
  const isDrawing = useRef(false);
  const linesRef = useRef<TLine[]>(data.lines);

  // Keep ref in sync via effect instead of during render
  useEffect(() => {
    linesRef.current = data.lines;
  }, [data.lines]);

  const getLocalPosition = useCallback(
    (e: KonvaEventObject<PointerEvent | MouseEvent | TouchEvent>) => {
      const stage = e.target.getStage();
      if (!stage) return null;

      const pointer = stage.getPointerPosition();
      if (!pointer) return null;

      // Convert from stage coords to local node coords
      const scale = stage.scaleX();
      const stageX = stage.x();
      const stageY = stage.y();

      const worldX = (pointer.x - stageX) / scale;
      const worldY = (pointer.y - stageY) / scale;

      // Subtract node position to get local coords
      const localX = worldX - node.x;
      const localY = worldY - node.y;

      // Clamp to node bounds
      const x = Math.max(0, Math.min(data.canvasWidth, localX));
      const y = Math.max(0, Math.min(data.canvasHeight, localY));

      return { x, y };
    },
    [node.x, node.y, data.canvasWidth, data.canvasHeight],
  );

  const handlePointerDown = useCallback(
    (e: KonvaEventObject<PointerEvent | MouseEvent>) => {
      if (!isEditing) return;
      e.cancelBubble = true;

      const pos = getLocalPosition(e);
      if (!pos) return;

      isDrawing.current = true;

      const newLine: TLine = {
        points: [pos.x, pos.y, pos.x, pos.y],
        color: "#000000",
        size: 2,
        opacity: 1,
        type: ToolType.BRUSH,
        timestamp: Date.now(),
      };

      onUpdateLines([...linesRef.current, newLine]);
    },
    [isEditing, getLocalPosition, onUpdateLines],
  );

  const handlePointerMove = useCallback(
    (e: KonvaEventObject<PointerEvent | MouseEvent>) => {
      if (!isEditing || !isDrawing.current) return;
      e.cancelBubble = true;

      const pos = getLocalPosition(e);
      if (!pos) return;

      const lines = [...linesRef.current];
      const lastLine = lines[lines.length - 1];
      if (!lastLine) return;

      const updatedLine: TLine = {
        ...lastLine,
        points: [...lastLine.points, pos.x, pos.y],
      };
      lines[lines.length - 1] = updatedLine;

      onUpdateLines(lines);
    },
    [isEditing, getLocalPosition, onUpdateLines],
  );

  const handlePointerUp = useCallback(() => {
    isDrawing.current = false;
  }, []);

  return (
    <Group
      onDblClick={(e) => {
        if (!isEditing) {
          e.cancelBubble = true;
          onStartEdit();
        }
      }}
      onDblTap={(e) => {
        if (!isEditing) {
          e.cancelBubble = true;
          onStartEdit();
        }
      }}
      onPointerDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
    >
      {/* Canvas background */}
      <Rect
        x={0}
        y={0}
        width={node.width}
        height={node.height}
        fill="#FAFAFA"
        cornerRadius={8}
        stroke={isEditing ? "#8B5CF6" : undefined}
        strokeWidth={isEditing ? 2 : 0}
        dash={isEditing ? [4, 4] : undefined}
      />

      {/* Grid dots for doodle paper feel */}
      {Array.from({ length: Math.floor(node.width / 20) }).map((_, col) =>
        Array.from({ length: Math.floor(node.height / 20) }).map((_, row) => (
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

      {/* Hint text when empty and not editing */}
      {data.lines.length === 0 && !isEditing && (
        <Text
          x={0}
          y={node.height / 2 - 10}
          width={node.width}
          text="Double-click to draw"
          fontSize={12}
          fill="#9CA3AF"
          align="center"
        />
      )}

      {/* Editing indicator */}
      {isEditing && (
        <Text
          x={4}
          y={4}
          text="Drawing mode (Esc to exit)"
          fontSize={10}
          fill="#8B5CF6"
        />
      )}

      {/* Render lines scaled to node size */}
      {data.lines.map((line, i) => {
        const scaleX = node.width / data.canvasWidth;
        const scaleY = node.height / data.canvasHeight;
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
            opacity={line.opacity}
            tension={0.5}
            lineCap="round"
            lineJoin="round"
            globalCompositeOperation={
              line.type === ToolType.ERASER
                ? "destination-out"
                : "source-over"
            }
            listening={false}
          />
        );
      })}
    </Group>
  );
};

export default DoodleNode;
