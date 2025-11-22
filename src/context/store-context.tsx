"use client";

import { StoreState, createCompoundStore } from "@/store";
import { ReactNode, createContext, useRef } from "react";
import { StoreApi } from "zustand";

export const StoreContext = createContext<StoreApi<StoreState> | null>(null);

const StoreProvider = ({ children }: { children: ReactNode }) => {
    const storeRef = useRef<StoreApi<StoreState> | null>(null);

    if (!storeRef.current) {
        storeRef.current = createCompoundStore();
    }

    return (
        <StoreContext.Provider value={storeRef.current}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;
