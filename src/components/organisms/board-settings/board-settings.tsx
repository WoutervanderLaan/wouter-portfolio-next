"use client";

import Button from "@/components/atoms/button/button";
import Sidebar from "../../molecules/sidebar/sidebar";
import Tooltip from "@/components/molecules/tooltip/tooltip";
import useBoardStore from "@/hooks/store-hooks/use-board-store";
import useSession from "@/hooks/use-session";
import clsx from "clsx";
import { BoardTool } from "@/lib/types/board";
import {
  createImageNode,
  serializeBoard,
  exportBoardAsJSON,
} from "@/utils/board-utils";
import Pointer from "@/components/icons/pointer";
import Connect from "@/components/icons/connect";
import TextIcon from "@/components/icons/text";
import ImageIcon from "@/components/icons/image";
import Sticky from "@/components/icons/sticky";
import Pencil from "@/components/icons/pencil";
import Move from "@/components/icons/move";
import ZoomIn from "@/components/icons/zoom-in";
import Bin from "@/components/icons/bin";
import Download from "@/components/icons/download";

const BUTTON_STYLE =
  "h-9 flex aspect-square items-center justify-center self-start overflow-hidden";

const ToolButton = ({
  tool,
  tooltip,
  children,
}: {
  tool: BoardTool;
  tooltip: string;
  children: React.ReactNode;
}) => {
  const { boardTool, setBoardTool } = useBoardStore();

  return (
    <Tooltip tooltipText={tooltip}>
      <Button
        onPress={() => setBoardTool(tool)}
        variant="secondary"
        className={clsx(BUTTON_STYLE, {
          "ring-2 ring-blue-400 ring-offset-2": boardTool === tool,
        })}
      >
        {children}
      </Button>
    </Tooltip>
  );
};

const ImageUploadButton = () => {
  const { addNode } = useBoardStore();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      if (src) {
        const node = createImageNode(src, { x: 100, y: 100 });
        addNode(node);
      }
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  return (
    <Tooltip tooltipText="Add image">
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="absolute inset-0 cursor-pointer opacity-0"
          style={{ zIndex: 10 }}
        />
        <Button variant="secondary" className={clsx(BUTTON_STYLE)}>
          <ImageIcon />
        </Button>
      </div>
    </Tooltip>
  );
};

const ClearBoardButton = () => {
  const { clearBoard, nodes } = useBoardStore();
  const session = useSession();

  const handleClear = async () => {
    clearBoard();
    await session.reset();
  };

  return (
    <Tooltip tooltipText="Clear board">
      <Button
        onPress={handleClear}
        variant="secondary"
        isDisabled={nodes.length === 0 || session.isLoading}
        className={clsx(BUTTON_STYLE)}
      >
        <Bin />
      </Button>
    </Tooltip>
  );
};

const ExportButton = () => {
  const { nodes, edges, boardViewport } = useBoardStore();
  const session = useSession();

  const handleExport = () => {
    const board = serializeBoard(
      nodes,
      edges,
      boardViewport,
      session.sessionId ?? "local",
    );
    exportBoardAsJSON(board);
  };

  return (
    <Tooltip tooltipText="Export board">
      <Button
        onPress={handleExport}
        variant="secondary"
        isDisabled={nodes.length === 0}
        className={clsx(BUTTON_STYLE)}
      >
        <Download />
      </Button>
    </Tooltip>
  );
};

const DeleteSelectedButton = () => {
  const { selectedNodeId, selectedEdgeId, removeNode, removeEdge } =
    useBoardStore();

  const hasSelection = selectedNodeId || selectedEdgeId;

  const handleDelete = () => {
    if (selectedNodeId) removeNode(selectedNodeId);
    if (selectedEdgeId) removeEdge(selectedEdgeId);
  };

  return (
    <Tooltip tooltipText="Delete selected">
      <Button
        onPress={handleDelete}
        variant="secondary"
        isDisabled={!hasSelection}
        className={clsx(BUTTON_STYLE)}
      >
        <Bin />
      </Button>
    </Tooltip>
  );
};

const BoardSettings = () => {
  return (
    <Sidebar className="h-full">
      <div className="flex flex-col gap-2 p-2">
        <ToolButton tool="select" tooltip="Select">
          <Pointer />
        </ToolButton>

        <ToolButton tool="connect" tooltip="Connect nodes">
          <Connect />
        </ToolButton>

        <div className="my-1 border-t border-gray-200" />

        <ToolButton tool="text" tooltip="Add text">
          <TextIcon />
        </ToolButton>

        <ImageUploadButton />

        <ToolButton tool="sticky" tooltip="Add sticky note">
          <Sticky />
        </ToolButton>

        <ToolButton tool="doodle" tooltip="Add doodle">
          <Pencil />
        </ToolButton>

        <div className="my-1 border-t border-gray-200" />

        <ToolButton tool="pan" tooltip="Pan">
          <Move />
        </ToolButton>

        <ToolButton tool="zoom" tooltip="Zoom">
          <ZoomIn />
        </ToolButton>

        <div className="my-1 border-t border-gray-200" />

        <DeleteSelectedButton />
        <ClearBoardButton />
        <ExportButton />
      </div>
    </Sidebar>
  );
};

export default BoardSettings;
