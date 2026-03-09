"use client";

import { useShallow } from "zustand/shallow";
import { useStore } from "./use-store";
import { BoardSlice } from "@/store/slices/board-slice";

const useBoardStore = () => {
  const boardStore: BoardSlice = useStore(
    useShallow((state) => ({
      nodes: state.nodes,
      edges: state.edges,
      selectedNodeId: state.selectedNodeId,
      selectedEdgeId: state.selectedEdgeId,
      connectionDraft: state.connectionDraft,
      boardTool: state.boardTool,
      boardViewport: state.boardViewport,
      editingDoodleId: state.editingDoodleId,
      addNode: state.addNode,
      updateNode: state.updateNode,
      removeNode: state.removeNode,
      selectNode: state.selectNode,
      addEdge: state.addEdge,
      removeEdge: state.removeEdge,
      selectEdge: state.selectEdge,
      startConnection: state.startConnection,
      completeConnection: state.completeConnection,
      cancelConnection: state.cancelConnection,
      loadBoard: state.loadBoard,
      clearBoard: state.clearBoard,
      setBoardTool: state.setBoardTool,
      setBoardViewport: state.setBoardViewport,
      setEditingDoodleId: state.setEditingDoodleId,
    })),
  );

  if (!boardStore) throw Error("useBoardStore used outside provider");
  return boardStore;
};

export default useBoardStore;
