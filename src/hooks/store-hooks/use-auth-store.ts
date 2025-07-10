"use client";

import { useShallow } from "zustand/shallow";
import { useStore } from "./use-store";
import { AuthSlice } from "@/store/slices/auth-slice";

const useAuthStore = () => {
    const authStore: AuthSlice = useStore(
        useShallow((state) => ({
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            setToken: state.setToken,
            clearAuth: state.clearAuth,
        })),
    );
    if (!authStore) throw Error("useAuthStore used outside provider");

    return authStore;
};

export default useAuthStore;
