"use client";

import { StickyNodeData } from "@/lib/types/board";
import { Rect, Text } from "react-konva";

interface StickyNodeProps {
  width: number;
  height: number;
  data: StickyNodeData;
}

const StickyNode = ({ width, height, data }: StickyNodeProps) => {
  return (
    <>
      <Rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill={data.color ?? "#FEF3C7"}
        cornerRadius={8}
      />
      <Text
        x={12}
        y={12}
        width={width - 24}
        height={height - 24}
        text={data.content}
        fontSize={14}
        fill="#1F2937"
        wrap="word"
        ellipsis
      />
    </>
  );
};

export default StickyNode;
