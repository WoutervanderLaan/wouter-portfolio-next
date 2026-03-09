import {
  Anchor,
  BoardNode,
  BoardState,
  BoardViewport,
  Edge,
} from "@/lib/types/board";

let idCounter = 0;

const generateId = (): string => {
  idCounter++;
  return `${Date.now()}-${idCounter}-${Math.random().toString(36).slice(2, 8)}`;
};

export const createImageNode = (
  src: string,
  position: { x: number; y: number },
  author = "user",
): BoardNode => ({
  id: generateId(),
  type: "image",
  x: position.x,
  y: position.y,
  width: 300,
  height: 200,
  timestamp: Date.now(),
  author,
  data: { type: "image", src },
});

export const createTextNode = (
  content: string,
  position: { x: number; y: number },
  author = "user",
): BoardNode => ({
  id: generateId(),
  type: "text",
  x: position.x,
  y: position.y,
  width: 200,
  height: 50,
  timestamp: Date.now(),
  author,
  data: { type: "text", content },
});

export const createStickyNode = (
  content: string,
  position: { x: number; y: number },
  author = "user",
): BoardNode => ({
  id: generateId(),
  type: "sticky",
  x: position.x,
  y: position.y,
  width: 200,
  height: 150,
  timestamp: Date.now(),
  author,
  data: { type: "sticky", content, color: "#FEF3C7" },
});

export const createDoodleNode = (
  position: { x: number; y: number },
  author = "user",
): BoardNode => ({
  id: generateId(),
  type: "doodle",
  x: position.x,
  y: position.y,
  width: 300,
  height: 200,
  timestamp: Date.now(),
  author,
  data: { type: "doodle", lines: [], canvasWidth: 300, canvasHeight: 200 },
});

export const createGroupNode = (
  childIds: string[],
  position: { x: number; y: number } = { x: 0, y: 0 },
  author = "user",
): BoardNode => ({
  id: generateId(),
  type: "group",
  x: position.x,
  y: position.y,
  width: 0,
  height: 0,
  timestamp: Date.now(),
  author,
  data: { type: "group", childIds },
});

export const createEdge = (
  fromId: string,
  toId: string,
  fromAnchor: Anchor = "right",
  toAnchor: Anchor = "left",
): Edge => ({
  id: generateId(),
  from: fromId,
  to: toId,
  fromAnchor,
  toAnchor,
  style: {
    stroke: "#555",
    strokeWidth: 2,
  },
});

export const getAnchorPosition = (
  node: BoardNode,
  anchor: Anchor,
): { x: number; y: number } => {
  switch (anchor) {
    case "top":
      return { x: node.x + node.width / 2, y: node.y };
    case "bottom":
      return { x: node.x + node.width / 2, y: node.y + node.height };
    case "left":
      return { x: node.x, y: node.y + node.height / 2 };
    case "right":
      return { x: node.x + node.width, y: node.y + node.height / 2 };
  }
};

export const calculateBezierPoints = (
  fromNode: BoardNode,
  toNode: BoardNode,
  edge: Edge,
): number[] => {
  const from = getAnchorPosition(fromNode, edge.fromAnchor ?? "right");
  const to = getAnchorPosition(toNode, edge.toAnchor ?? "left");

  const dx = Math.abs(to.x - from.x);
  const dy = Math.abs(to.y - from.y);
  const offset = Math.max(50, Math.min(dx, dy) * 0.5);

  const getControlOffset = (anchor: Anchor): { dx: number; dy: number } => {
    switch (anchor) {
      case "top":
        return { dx: 0, dy: -offset };
      case "bottom":
        return { dx: 0, dy: offset };
      case "left":
        return { dx: -offset, dy: 0 };
      case "right":
        return { dx: offset, dy: 0 };
    }
  };

  const cp1Offset = getControlOffset(edge.fromAnchor ?? "right");
  const cp2Offset = getControlOffset(edge.toAnchor ?? "left");

  // Konva bezier: [startX, startY, cp1X, cp1Y, cp2X, cp2Y, endX, endY]
  return [
    from.x,
    from.y,
    from.x + cp1Offset.dx,
    from.y + cp1Offset.dy,
    to.x + cp2Offset.dx,
    to.y + cp2Offset.dy,
    to.x,
    to.y,
  ];
};

export const layoutMindMap = (
  rootId: string,
  nodes: BoardNode[],
  offset = { x: 0, y: 150 },
): BoardNode[] => {
  const root = nodes.find((n) => n.id === rootId);
  if (!root || root.data.type !== "group") return nodes;

  const childIds = root.data.childIds;
  const spacing = 250;

  return nodes.map((node) => {
    const childIndex = childIds.indexOf(node.id);
    if (childIndex === -1) return node;

    return {
      ...node,
      x: root.x + (childIndex - childIds.length / 2) * spacing,
      y: root.y + offset.y,
    };
  });
};

export const generateSemanticGroupingPrompt = (
  nodes: BoardNode[],
): string => {
  const lines = nodes
    .filter(
      (n) =>
        n.data.type === "text" ||
        n.data.type === "sticky",
    )
    .map((n) => {
      const data = n.data as { content: string };
      return `- ${data.content}`;
    })
    .join("\n");

  return `Group the following ideas into conceptual clusters:\n${lines}`;
};

export const serializeBoard = (
  nodes: BoardNode[],
  edges: Edge[],
  viewport: BoardViewport,
  visitId: string,
): BoardState => ({
  nodes,
  edges,
  viewport,
  meta: {
    visitId,
    lastModified: Date.now(),
    version: 1,
  },
});

export const deserializeBoard = (
  state: BoardState,
): { nodes: BoardNode[]; edges: Edge[]; viewport: BoardViewport } => ({
  nodes: state.nodes,
  edges: state.edges,
  viewport: state.viewport,
});

export const exportBoardAsJSON = (board: BoardState): void => {
  const blob = new Blob([JSON.stringify(board, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `studio-visit-${board.meta.visitId}-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
};
