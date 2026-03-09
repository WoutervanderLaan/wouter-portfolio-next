"use client";

import { BoardNode as BoardNodeType, Edge } from "@/lib/types/board";
import { calculateBezierPoints } from "@/utils/board-utils";
import { Shape, Text } from "react-konva";

interface BoardEdgeProps {
  edge: Edge;
  fromNode: BoardNodeType;
  toNode: BoardNodeType;
  isSelected: boolean;
  onSelect: () => void;
}

const BoardEdge = ({
  edge,
  fromNode,
  toNode,
  isSelected,
  onSelect,
}: BoardEdgeProps) => {
  const bezierPoints = calculateBezierPoints(fromNode, toNode, edge);

  const [startX, startY, cp1X, cp1Y, cp2X, cp2Y, endX, endY] = bezierPoints;

  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;

  return (
    <>
      {/* Hit area (wider invisible line for easier clicking) */}
      <Shape
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(startX, startY);
          context.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY);
          context.fillStrokeShape(shape);
        }}
        stroke="transparent"
        strokeWidth={12}
        onClick={onSelect}
        onTap={onSelect}
      />

      {/* Visible bezier curve */}
      <Shape
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(startX, startY);
          context.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY);
          context.fillStrokeShape(shape);
        }}
        stroke={isSelected ? "#3B82F6" : edge.style.stroke}
        strokeWidth={isSelected ? 3 : edge.style.strokeWidth}
        dash={edge.style.dash}
        hitStrokeWidth={0}
        listening={false}
      />

      {/* Edge label */}
      {edge.label && (
        <Text
          x={midX - 30}
          y={midY - 8}
          text={edge.label}
          fontSize={11}
          fill="#6B7280"
          width={60}
          align="center"
        />
      )}
    </>
  );
};

export default BoardEdge;
