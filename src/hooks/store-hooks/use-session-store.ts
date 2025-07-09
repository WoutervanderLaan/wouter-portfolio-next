"use client";

import { useShallow } from "zustand/shallow";
import { useStore } from "./use-store";

const useSessionStore = () => {
    const sessionStore = useStore(useShallow((state) => state));
    if (!sessionStore) throw Error("useSessionStore used outside provider");

    return sessionStore;
};

export default useSessionStore;
