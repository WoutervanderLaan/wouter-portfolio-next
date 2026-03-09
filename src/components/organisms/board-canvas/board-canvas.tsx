"use client";

import { Stage, Layer } from "react-konva";
import { useRef, useCallback } from "react";
import { MotionDiv } from "@/components/atoms/motion-element/motion-element";
import useBoardStore from "@/hooks/store-hooks/use-board-store";
import BoardNode from "@/components/molecules/board-node/board-node";
import BoardEdge from "@/components/molecules/board-edge/board-edge";
import StickyNode from "@/components/molecules/sticky-node/sticky-node";
import DoodleNode from "@/components/molecules/doodle-node/doodle-node";
import {
  createTextNode,
  createStickyNode,
  createDoodleNode,
  createImageNode,
} from "@/utils/board-utils";
import { Image as KonvaImage, Text as KonvaText } from "react-konva";
import {
  BoardNode as BoardNodeType,
  ImageNodeData,
  TextNodeData,
  Anchor,
} from "@/lib/types/board";
import { useEffect, useState } from "react";
import { KonvaEventObject } from "konva/lib/Node";
import Konva from "konva";

const ImageNodeContent = ({
  node,
  data,
}: {
  node: BoardNodeType;
  data: ImageNodeData;
}) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!data.src) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => setImage(img);
    img.src = data.src;
  }, [data.src]);

  if (!image) return null;

  return (
    <KonvaImage
      image={image}
      x={4}
      y={4}
      width={node.width - 8}
      height={node.height - 8}
      cornerRadius={6}
      listening={false}
    />
  );
};

const TextNodeContent = ({
  node,
  data,
}: {
  node: BoardNodeType;
  data: TextNodeData;
}) => (
  <KonvaText
    x={12}
    y={12}
    width={node.width - 24}
    height={node.height - 24}
    text={data.content}
    fontSize={data.fontSize ?? 14}
    fontFamily={data.fontFamily ?? "sans-serif"}
    fill="#1F2937"
    wrap="word"
    listening={false}
  />
);

const BoardCanvas = () => {
  const {
    nodes,
    edges,
    selectedNodeId,
    selectedEdgeId,
    connectionDraft,
    boardTool,
    boardViewport,
    editingDoodleId,
    addNode,
    updateNode,
    removeNode,
    removeEdge,
    selectNode,
    selectEdge,
    startConnection,
    completeConnection,
    cancelConnection,
    setBoardViewport,
    setEditingDoodleId,
  } = useBoardStore();

  const stageRef = useRef<Konva.Stage>(null);
  const [stageSize, setStageSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateSize = () => {
      setStageSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleStageClick = useCallback(
    (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
      if (e.target !== e.target.getStage()) return;

      const stage = e.target.getStage();
      const pointer = stage?.getPointerPosition();
      if (!pointer || !stage) return;

      const scale = stage.scaleX();
      const x = (pointer.x - stage.x()) / scale;
      const y = (pointer.y - stage.y()) / scale;

      if (connectionDraft) {
        cancelConnection();
        return;
      }

      switch (boardTool) {
        case "text": {
          const node = createTextNode("Text", { x, y });
          addNode(node);
          selectNode(node.id);
          break;
        }
        case "sticky": {
          const node = createStickyNode("Note", { x, y });
          addNode(node);
          selectNode(node.id);
          break;
        }
        case "doodle": {
          const node = createDoodleNode({ x, y });
          addNode(node);
          selectNode(node.id);
          setEditingDoodleId(node.id);
          break;
        }
        case "select":
        default:
          selectNode(null);
          selectEdge(null);
          break;
      }
    },
    [
      boardTool,
      connectionDraft,
      addNode,
      selectNode,
      selectEdge,
      cancelConnection,
      setEditingDoodleId,
    ],
  );

  const handleWheel = useCallback(
    (e: KonvaEventObject<WheelEvent>) => {
      e.evt.preventDefault();
      const stage = stageRef.current;
      if (!stage) return;

      const scaleBy = 1.05;
      const oldScale = stage.scaleX();
      const pointer = stage.getPointerPosition();
      if (!pointer) return;

      const mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale,
      };

      const direction = e.evt.deltaY > 0 ? -1 : 1;
      const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;
      const clampedScale = Math.max(0.1, Math.min(5, newScale));

      setBoardViewport({
        scale: clampedScale,
        x: pointer.x - mousePointTo.x * clampedScale,
        y: pointer.y - mousePointTo.y * clampedScale,
      });
    },
    [setBoardViewport],
  );

  const handleAnchorClick = useCallback(
    (nodeId: string, anchor: Anchor) => {
      if (boardTool !== "connect" && !connectionDraft) return;

      if (connectionDraft) {
        completeConnection(nodeId, anchor);
      } else {
        startConnection(nodeId, anchor);
      }
    },
    [boardTool, connectionDraft, startConnection, completeConnection],
  );

  const handleNodeDragEnd = useCallback(
    (nodeId: string, x: number, y: number) => {
      updateNode(nodeId, { x, y });
    },
    [updateNode],
  );

  const handleNodeTransformEnd = useCallback(
    (nodeId: string, width: number, height: number, x: number, y: number) => {
      updateNode(nodeId, { width, height, x, y });
    },
    [updateNode],
  );

  const handleImageDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (!file || !file.type.startsWith("image/")) return;

      const reader = new FileReader();
      reader.onload = (evt) => {
        const src = evt.target?.result as string;
        if (!src || !stageRef.current) return;

        const stage = stageRef.current;
        const scale = stage.scaleX();
        const rect = stage.container().getBoundingClientRect();
        const x = (e.clientX - rect.left - stage.x()) / scale;
        const y = (e.clientY - rect.top - stage.y()) / scale;

        const node = createImageNode(src, { x, y });
        addNode(node);
      };
      reader.readAsDataURL(file);
    },
    [addNode],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (selectedNodeId) {
          removeNode(selectedNodeId);
        } else if (selectedEdgeId) {
          removeEdge(selectedEdgeId);
        }
      }
      if (e.key === "Escape") {
        if (connectionDraft) cancelConnection();
        if (editingDoodleId) setEditingDoodleId(null);
        selectNode(null);
        selectEdge(null);
      }
    },
    [
      selectedNodeId,
      selectedEdgeId,
      connectionDraft,
      editingDoodleId,
      removeNode,
      removeEdge,
      cancelConnection,
      setEditingDoodleId,
      selectNode,
      selectEdge,
    ],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const isPannable = boardTool === "pan";

  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleImageDrop}
      >
        <Stage
          ref={stageRef}
          className="absolute left-0 top-0 m-0 h-full w-full overflow-hidden border bg-white"
          style={{
            backgroundImage: `radial-gradient(circle, #D1D5DB 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
            cursor: isPannable
              ? "grab"
              : boardTool === "connect" || connectionDraft
                ? "crosshair"
                : boardTool === "text" || boardTool === "sticky" || boardTool === "doodle"
                  ? "cell"
                  : "default",
          }}
          width={stageSize.width}
          height={stageSize.height}
          scaleX={boardViewport.scale}
          scaleY={boardViewport.scale}
          x={boardViewport.x}
          y={boardViewport.y}
          draggable={isPannable}
          onDragEnd={(e) => {
            if (e.target === stageRef.current) {
              setBoardViewport({
                x: e.target.x(),
                y: e.target.y(),
              });
            }
          }}
          onClick={handleStageClick}
          onTap={handleStageClick}
          onWheel={handleWheel}
        >
          {/* Edge layer */}
          <Layer>
            {edges.map((edge) => {
              const fromNode = nodes.find((n) => n.id === edge.from);
              const toNode = nodes.find((n) => n.id === edge.to);
              if (!fromNode || !toNode) return null;

              return (
                <BoardEdge
                  key={edge.id}
                  edge={edge}
                  fromNode={fromNode}
                  toNode={toNode}
                  isSelected={selectedEdgeId === edge.id}
                  onSelect={() => selectEdge(edge.id)}
                />
              );
            })}
          </Layer>

          {/* Node layer */}
          <Layer>
            {nodes.map((node) => {
              const showAnchors =
                boardTool === "connect" || connectionDraft !== null;

              return (
                <BoardNode
                  key={node.id}
                  node={node}
                  isSelected={selectedNodeId === node.id}
                  showAnchors={showAnchors}
                  onSelect={() => selectNode(node.id)}
                  onDragEnd={(x, y) => handleNodeDragEnd(node.id, x, y)}
                  onTransformEnd={(w, h, x, y) =>
                    handleNodeTransformEnd(node.id, w, h, x, y)
                  }
                  onAnchorClick={(anchor) => handleAnchorClick(node.id, anchor)}
                >
                  {node.data.type === "image" && (
                    <ImageNodeContent node={node} data={node.data} />
                  )}
                  {node.data.type === "text" && (
                    <TextNodeContent node={node} data={node.data} />
                  )}
                  {node.data.type === "sticky" && (
                    <StickyNode
                      width={node.width}
                      height={node.height}
                      data={node.data}
                    />
                  )}
                  {node.data.type === "doodle" && (
                    <DoodleNode
                      width={node.width}
                      height={node.height}
                      data={node.data}
                      isEditing={editingDoodleId === node.id}
                      onDoubleClick={() => setEditingDoodleId(node.id)}
                    />
                  )}
                </BoardNode>
              );
            })}
          </Layer>
        </Stage>
      </div>
    </MotionDiv>
  );
};

export default BoardCanvas;
