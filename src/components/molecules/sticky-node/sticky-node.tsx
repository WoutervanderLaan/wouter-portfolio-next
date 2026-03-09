"use client";

import { BoardNode as BoardNodeType, StickyNodeData } from "@/lib/types/board";
import { Rect, Text } from "react-konva";
import { useRef } from "react";
import Konva from "konva";

interface StickyNodeProps {
  node: BoardNodeType;
  data: StickyNodeData;
  onUpdate: (content: string) => void;
}

const StickyNode = ({ node, data, onUpdate }: StickyNodeProps) => {
  const textRef = useRef<Konva.Text>(null);

  const handleDoubleClick = () => {
    const textNode = textRef.current;
    const stage = textNode?.getStage();
    if (!textNode || !stage) return;

    textNode.hide();
    textNode.getLayer()?.batchDraw();

    const textPosition = textNode.absolutePosition();
    const stageBox = stage.container().getBoundingClientRect();
    const scale = stage.scaleX();

    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);

    textarea.value = data.content;
    textarea.style.position = "absolute";
    textarea.style.top = stageBox.top + textPosition.y * scale + "px";
    textarea.style.left = stageBox.left + textPosition.x * scale + "px";
    textarea.style.width = (node.width - 24) * scale + "px";
    textarea.style.height = (node.height - 24) * scale + "px";
    textarea.style.fontSize = 14 * scale + "px";
    textarea.style.fontFamily = "sans-serif";
    textarea.style.border = "none";
    textarea.style.borderRadius = "4px";
    textarea.style.padding = "4px";
    textarea.style.margin = "0px";
    textarea.style.overflow = "hidden";
    textarea.style.background = data.color ?? "#FEF3C7";
    textarea.style.outline = "2px solid #F59E0B";
    textarea.style.resize = "none";
    textarea.style.color = "#1F2937";
    textarea.style.lineHeight = "1.4";
    textarea.style.zIndex = "1000";
    textarea.focus();
    textarea.select();

    const removeTextarea = () => {
      const newContent = textarea.value;
      if (textarea.parentNode) {
        textarea.parentNode.removeChild(textarea);
      }
      window.removeEventListener("mousedown", handleOutsideClick);
      textNode.show();
      textNode.getLayer()?.batchDraw();
      if (newContent !== data.content) {
        onUpdate(newContent);
      }
    };

    textarea.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        removeTextarea();
      }
      if (e.key === "Escape") {
        textarea.value = data.content;
        removeTextarea();
      }
    });

    const handleOutsideClick = (e: MouseEvent) => {
      if (e.target !== textarea) {
        removeTextarea();
      }
    };

    setTimeout(() => {
      window.addEventListener("mousedown", handleOutsideClick);
    }, 0);
  };

  return (
    <>
      <Rect
        x={0}
        y={0}
        width={node.width}
        height={node.height}
        fill={data.color ?? "#FEF3C7"}
        cornerRadius={8}
      />
      <Text
        ref={textRef}
        x={12}
        y={12}
        width={node.width - 24}
        height={node.height - 24}
        text={data.content}
        fontSize={14}
        fill="#1F2937"
        wrap="word"
        ellipsis
        onDblClick={handleDoubleClick}
        onDblTap={handleDoubleClick}
      />
    </>
  );
};

export default StickyNode;
