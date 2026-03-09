import { TLine } from "./line";

export type NodeType = "image" | "text" | "sticky" | "doodle" | "group";

export type ImageNodeData = { type: "image"; src: string; alt?: string };
export type TextNodeData = {
  type: "text";
  content: string;
  fontSize?: number;
  fontFamily?: string;
};
export type StickyNodeData = { type: "sticky"; content: string; color?: string };
export type DoodleNodeData = {
  type: "doodle";
  lines: TLine[];
  canvasWidth: number;
  canvasHeight: number;
};
export type GroupNodeData = { type: "group"; childIds: string[] };

export type NodeData =
  | ImageNodeData
  | TextNodeData
  | StickyNodeData
  | DoodleNodeData
  | GroupNodeData;

export interface BoardNode {
  id: string;
  type: NodeType;
  x: number;
  y: number;
  width: number;
  height: number;
  timestamp: number;
  author: string;
  label?: string;
  locked?: boolean;
  data: NodeData;
}

export type Anchor = "top" | "right" | "bottom" | "left";

export interface EdgeStyle {
  stroke: string;
  strokeWidth: number;
  dash?: number[];
}

export interface Edge {
  id: string;
  from: string;
  to: string;
  fromAnchor?: Anchor;
  toAnchor?: Anchor;
  label?: string;
  style: EdgeStyle;
}

export type BoardTool =
  | "select"
  | "connect"
  | "doodle"
  | "text"
  | "image"
  | "sticky"
  | "pan"
  | "zoom";

export interface BoardViewport {
  x: number;
  y: number;
  scale: number;
}

export interface BoardMeta {
  visitId: string;
  lastModified: number;
  version: number;
}

export interface BoardState {
  nodes: BoardNode[];
  edges: Edge[];
  viewport: BoardViewport;
  meta: BoardMeta;
}
