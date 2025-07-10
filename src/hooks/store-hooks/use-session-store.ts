"use client";

import { useShallow } from "zustand/shallow";
import { useStore } from "./use-store";
import { SessionSlice } from "@/store/slices/session-slice";

const useSessionStore = () => {
    const sessionStore: SessionSlice = useStore(
        useShallow((state) => ({
            sessionId: state.sessionId,
            setSessionId: state.setSessionId,
            clearSession: state.clearSession,
        })),
    );

    if (!sessionStore) throw Error("useSessionStore used outside provider");
    return sessionStore;
};

export default useSessionStore;
