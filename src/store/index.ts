import { createStore } from "zustand/vanilla";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { createCanvasSlice, CanvasSlice } from "./slices/canvas-slice";
import { AuthSlice, createAuthSlice } from "./slices/auth-slice";
import { SessionSlice, createSessionSlice } from "./slices/session-slice";

export type StoreState = CanvasSlice & AuthSlice & SessionSlice;

export const createCompoundStore = () =>
    createStore<StoreState>()(
        persist(
            immer((...args) => ({
                ...createCanvasSlice(...args),
                ...createAuthSlice(...args),
                ...createSessionSlice(...args),
            })),
            {
                name: "Layers",
                partialize: (state) => ({
                    layers: state.layers,
                }),
            },
        ),
    );
