import { StateCreator } from "zustand";
import { StoreState } from "..";

type SessionState = {
    sessionId: string | null;
};

type SessionActions = {
    setSessionId: (id: string) => void;
    clearSession: () => void;
};

export type SessionSlice = SessionState & SessionActions;

const DEFAULT_STATE: SessionState = {
    sessionId: null,
};

export const createSessionSlice: StateCreator<
    StoreState,
    [["zustand/immer", never]],
    [],
    SessionSlice
> = (set) => ({
    ...DEFAULT_STATE,
    setSessionId: (sessionId) =>
        set(() => ({
            sessionId,
        })),
    clearSession: () =>
        set(() => ({
            sessionId: null,
        })),
});
