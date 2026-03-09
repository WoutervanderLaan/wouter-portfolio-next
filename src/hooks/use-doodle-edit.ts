"use client";

import { useCallback, useRef, useState } from "react";
import { TLine } from "@/lib/types/line";
import { DoodleNodeData } from "@/lib/types/board";
import { ToolType } from "@/lib/types/tool-type";
import useBoardStore from "./store-hooks/use-board-store";

const useDoodleEdit = (nodeId: string) => {
  const { nodes, updateNode, editingDoodleId, setEditingDoodleId } =
    useBoardStore();
  const isDrawing = useRef(false);
  const [brushColor, setBrushColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(3);
  const [brushType, setBrushType] = useState<ToolType>(ToolType.BRUSH);

  const node = nodes.find((n) => n.id === nodeId);
  const isEditing = editingDoodleId === nodeId;

  const doodleData = node?.data as DoodleNodeData | undefined;

  const startLine = useCallback(
    (x: number, y: number) => {
      if (!doodleData) return;
      isDrawing.current = true;

      const newLine: TLine = {
        points: [x, y, x, y],
        color: brushColor,
        size: brushSize,
        opacity: 1,
        type: brushType,
        timestamp: Date.now(),
      };

      updateNode(nodeId, {
        data: {
          ...doodleData,
          lines: [...doodleData.lines, newLine],
        },
      });
    },
    [doodleData, brushColor, brushSize, brushType, nodeId, updateNode],
  );

  const updateLine = useCallback(
    (x: number, y: number) => {
      if (!isDrawing.current || !doodleData) return;

      const lines = [...doodleData.lines];
      const lastLine = lines[lines.length - 1];
      if (!lastLine) return;

      const updatedLine: TLine = {
        ...lastLine,
        points: [...lastLine.points, x, y],
      };
      lines[lines.length - 1] = updatedLine;

      updateNode(nodeId, {
        data: {
          ...doodleData,
          lines,
        },
      });
    },
    [doodleData, nodeId, updateNode],
  );

  const endLine = useCallback(() => {
    isDrawing.current = false;
  }, []);

  const enterEdit = useCallback(() => {
    setEditingDoodleId(nodeId);
  }, [nodeId, setEditingDoodleId]);

  const exitEdit = useCallback(() => {
    setEditingDoodleId(null);
    isDrawing.current = false;
  }, [setEditingDoodleId]);

  return {
    isEditing,
    brushColor,
    setBrushColor,
    brushSize,
    setBrushSize,
    brushType,
    setBrushType,
    startLine,
    updateLine,
    endLine,
    enterEdit,
    exitEdit,
    lines: doodleData?.lines ?? [],
  };
};

export default useDoodleEdit;
