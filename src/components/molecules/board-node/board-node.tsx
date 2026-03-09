"use client";

import { Anchor, BoardNode as BoardNodeType } from "@/lib/types/board";
import { Group, Rect, Text, Circle } from "react-konva";
import { useRef, useEffect } from "react";
import { KonvaEventObject } from "konva/lib/Node";
import { Transformer } from "react-konva";
import { Transformer as KonvaTransformerType } from "konva/lib/shapes/Transformer";
import { Group as KonvaGroupType } from "konva/lib/Group";

const ANCHOR_RADIUS = 5;
const ANCHOR_POSITIONS: Anchor[] = ["top", "right", "bottom", "left"];

interface BoardNodeProps {
  node: BoardNodeType;
  isSelected: boolean;
  showAnchors: boolean;
  onSelect: () => void;
  onDragEnd: (x: number, y: number) => void;
  onTransformEnd: (width: number, height: number, x: number, y: number) => void;
  onAnchorClick: (anchor: Anchor) => void;
  children: React.ReactNode;
}

const getAnchorOffset = (
  anchor: Anchor,
  width: number,
  height: number,
): { x: number; y: number } => {
  switch (anchor) {
    case "top":
      return { x: width / 2, y: 0 };
    case "bottom":
      return { x: width / 2, y: height };
    case "left":
      return { x: 0, y: height / 2 };
    case "right":
      return { x: width, y: height / 2 };
  }
};

const AUTHOR_COLORS: Record<string, string> = {
  user: "#3B82F6",
  artist: "#8B5CF6",
};

const BoardNode = ({
  node,
  isSelected,
  showAnchors,
  onSelect,
  onDragEnd,
  onTransformEnd,
  onAnchorClick,
  children,
}: BoardNodeProps) => {
  const groupRef = useRef<KonvaGroupType>(null);
  const transformerRef = useRef<KonvaTransformerType>(null);

  useEffect(() => {
    if (isSelected && transformerRef.current && groupRef.current) {
      transformerRef.current.nodes([groupRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  const handleDragEnd = (e: KonvaEventObject<Event>) => {
    onDragEnd(e.target.x(), e.target.y());
  };

  const handleTransformEnd = () => {
    const group = groupRef.current;
    if (!group) return;

    const scaleX = group.scaleX();
    const scaleY = group.scaleY();

    group.scaleX(1);
    group.scaleY(1);

    onTransformEnd(
      Math.max(50, node.width * scaleX),
      Math.max(30, node.height * scaleY),
      group.x(),
      group.y(),
    );
  };

  const authorColor = AUTHOR_COLORS[node.author] ?? "#6B7280";

  return (
    <>
      <Group
        ref={groupRef}
        x={node.x}
        y={node.y}
        draggable={!node.locked}
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
      >
        {/* Card background */}
        <Rect
          width={node.width}
          height={node.height}
          fill="#FFFFFF"
          stroke={isSelected ? "#3B82F6" : "#E5E7EB"}
          strokeWidth={isSelected ? 2 : 1}
          cornerRadius={8}
          shadowColor="rgba(0,0,0,0.1)"
          shadowBlur={isSelected ? 8 : 4}
          shadowOffsetY={2}
        />

        {/* Author indicator dot */}
        <Circle
          x={node.width - 10}
          y={10}
          radius={4}
          fill={authorColor}
        />

        {/* Label */}
        {node.label && (
          <Text
            x={8}
            y={node.height - 18}
            text={node.label}
            fontSize={10}
            fill="#9CA3AF"
            width={node.width - 24}
            ellipsis
            wrap="none"
          />
        )}

        {/* Node content */}
        {children}

        {/* Anchor points */}
        {showAnchors &&
          ANCHOR_POSITIONS.map((anchor) => {
            const pos = getAnchorOffset(anchor, node.width, node.height);
            return (
              <Circle
                key={anchor}
                x={pos.x}
                y={pos.y}
                radius={ANCHOR_RADIUS}
                fill="#3B82F6"
                stroke="#FFFFFF"
                strokeWidth={2}
                onClick={(e) => {
                  e.cancelBubble = true;
                  onAnchorClick(anchor);
                }}
                onTap={(e) => {
                  e.cancelBubble = true;
                  onAnchorClick(anchor);
                }}
                onMouseEnter={(e) => {
                  const container = e.target.getStage()?.container();
                  if (container) container.style.cursor = "crosshair";
                }}
                onMouseLeave={(e) => {
                  const container = e.target.getStage()?.container();
                  if (container) container.style.cursor = "default";
                }}
              />
            );
          })}
      </Group>

      {isSelected && !node.locked && (
        <Transformer
          ref={transformerRef}
          flipEnabled={false}
          rotationSnaps={[0, 90, 180, 270]}
          boundBoxFunc={(oldBox, newBox) => {
            if (Math.abs(newBox.width) < 50 || Math.abs(newBox.height) < 30) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default BoardNode;
