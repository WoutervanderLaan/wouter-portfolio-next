"use client";

import { useShallow } from "zustand/shallow";
import { useStore } from "./use-store";

const useAuthStore = () => {
    const authStore = useStore(useShallow((state) => state));
    if (!authStore) throw Error("useAuthStore used outside provider");

    return authStore;
};

export default useAuthStore;
