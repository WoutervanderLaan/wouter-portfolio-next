import { StoreContext } from "@/context/store-context";
import { StoreState } from "@/store";
import { useContext } from "react";
import { useStore as useZustandStore } from "zustand";

export const useStore = <T>(selector: (state: StoreState) => T): T => {
    const store = useContext(StoreContext);

    if (!store) throw new Error("useStore is used outside Provider.");

    return useZustandStore(store, selector);
};
