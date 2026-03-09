import {
  Anchor,
  BoardNode,
  BoardState,
  BoardTool,
  BoardViewport,
  Edge,
} from "@/lib/types/board";
import { createEdge } from "@/utils/board-utils";
import { StateCreator } from "zustand";
import { StoreState } from "..";

type ConnectionDraft = {
  fromId: string;
  fromAnchor: Anchor;
} | null;

type BoardSliceState = {
  nodes: BoardNode[];
  edges: Edge[];
  selectedNodeId: string | null;
  selectedEdgeId: string | null;
  connectionDraft: ConnectionDraft;
  boardTool: BoardTool;
  boardViewport: BoardViewport;
  editingDoodleId: string | null;
};

type BoardSliceActions = {
  addNode: (node: BoardNode) => void;
  updateNode: (id: string, updates: Partial<BoardNode>) => void;
  removeNode: (id: string) => void;
  selectNode: (id: string | null) => void;

  addEdge: (edge: Edge) => void;
  removeEdge: (id: string) => void;
  selectEdge: (id: string | null) => void;
  startConnection: (fromId: string, fromAnchor: Anchor) => void;
  completeConnection: (toId: string, toAnchor: Anchor) => void;
  cancelConnection: () => void;

  loadBoard: (state: BoardState) => void;
  clearBoard: () => void;

  setBoardTool: (tool: BoardTool) => void;
  setBoardViewport: (viewport: Partial<BoardViewport>) => void;

  setEditingDoodleId: (id: string | null) => void;
};

export type BoardSlice = BoardSliceState & BoardSliceActions;

const DEFAULT_BOARD_STATE: BoardSliceState = {
  nodes: [],
  edges: [],
  selectedNodeId: null,
  selectedEdgeId: null,
  connectionDraft: null,
  boardTool: "select",
  boardViewport: { x: 0, y: 0, scale: 1 },
  editingDoodleId: null,
};

export const createBoardSlice: StateCreator<
  StoreState,
  [["zustand/immer", never]],
  [],
  BoardSlice
> = (set) => ({
  ...DEFAULT_BOARD_STATE,

  addNode: (node) =>
    set((state) => {
      state.nodes.push(node);
    }),

  updateNode: (id, updates) =>
    set((state) => {
      const index = state.nodes.findIndex((n: BoardNode) => n.id === id);
      if (index !== -1) {
        state.nodes[index] = { ...state.nodes[index], ...updates };
      }
    }),

  removeNode: (id) =>
    set((state) => {
      state.nodes = state.nodes.filter((n: BoardNode) => n.id !== id);
      state.edges = state.edges.filter(
        (e: Edge) => e.from !== id && e.to !== id,
      );
      if (state.selectedNodeId === id) state.selectedNodeId = null;
      if (state.editingDoodleId === id) state.editingDoodleId = null;
    }),

  selectNode: (id) =>
    set((state) => {
      state.selectedNodeId = id;
      state.selectedEdgeId = null;
    }),

  addEdge: (edge) =>
    set((state) => {
      state.edges.push(edge);
    }),

  removeEdge: (id) =>
    set((state) => {
      state.edges = state.edges.filter((e: Edge) => e.id !== id);
      if (state.selectedEdgeId === id) state.selectedEdgeId = null;
    }),

  selectEdge: (id) =>
    set((state) => {
      state.selectedEdgeId = id;
      state.selectedNodeId = null;
    }),

  startConnection: (fromId, fromAnchor) =>
    set((state) => {
      state.connectionDraft = { fromId, fromAnchor };
    }),

  completeConnection: (toId, toAnchor) =>
    set((state) => {
      if (!state.connectionDraft) return;
      if (state.connectionDraft.fromId === toId) {
        state.connectionDraft = null;
        return;
      }

      const edge = createEdge(
        state.connectionDraft.fromId,
        toId,
        state.connectionDraft.fromAnchor,
        toAnchor,
      );
      state.edges.push(edge);
      state.connectionDraft = null;
    }),

  cancelConnection: () =>
    set((state) => {
      state.connectionDraft = null;
    }),

  loadBoard: (boardState) =>
    set((state) => {
      state.nodes = boardState.nodes;
      state.edges = boardState.edges;
      state.boardViewport = boardState.viewport;
      state.selectedNodeId = null;
      state.selectedEdgeId = null;
      state.connectionDraft = null;
      state.editingDoodleId = null;
    }),

  clearBoard: () =>
    set((state) => {
      state.nodes = [];
      state.edges = [];
      state.selectedNodeId = null;
      state.selectedEdgeId = null;
      state.connectionDraft = null;
      state.editingDoodleId = null;
    }),

  setBoardTool: (tool) =>
    set((state) => {
      state.boardTool = tool;
      if (tool !== "select") {
        state.selectedNodeId = null;
        state.selectedEdgeId = null;
      }
      if (tool !== "connect") {
        state.connectionDraft = null;
      }
    }),

  setBoardViewport: (viewport) =>
    set((state) => {
      state.boardViewport = { ...state.boardViewport, ...viewport };
    }),

  setEditingDoodleId: (id) =>
    set((state) => {
      state.editingDoodleId = id;
    }),
});
