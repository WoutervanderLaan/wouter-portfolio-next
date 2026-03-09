import { createStore } from "zustand/vanilla";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { createCanvasSlice, CanvasSlice } from "./slices/canvas-slice";
import { AuthSlice, createAuthSlice } from "./slices/auth-slice";
import { SessionSlice, createSessionSlice } from "./slices/session-slice";
import { BoardSlice, createBoardSlice } from "./slices/board-slice";

export type StoreState = CanvasSlice & AuthSlice & SessionSlice & BoardSlice;

export const createCompoundStore = () =>
  createStore<StoreState>()(
    persist(
      immer((...args) => ({
        ...createCanvasSlice(...args),
        ...createAuthSlice(...args),
        ...createSessionSlice(...args),
        ...createBoardSlice(...args),
      })),
      {
        name: "StudioBoard",
        partialize: (state) => ({
          nodes: state.nodes,
          edges: state.edges,
          boardViewport: state.boardViewport,
          layers: state.layers,
          images: state.images,
        }),
        merge: (persisted, current) => {
          const persistedState = persisted as Partial<StoreState>;
          return {
            ...(current as StoreState),
            ...persistedState,
            nodes: persistedState.nodes ?? [],
            edges: persistedState.edges ?? [],
            images: (persistedState.images ?? []).map((el) => ({
              ...el,
              timestamp: el.timestamp ?? 0,
            })),
          };
        },
      },
    ),
  );
