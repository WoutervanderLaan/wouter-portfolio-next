import { StateCreator } from "zustand";
import { StoreState } from "..";

type AuthState = {
    isAuthenticated: boolean;
    token: string | null;
};

type AuthActions = {
    setToken: (token: string) => void;
    clearAuth: () => void;
};

export type AuthSlice = AuthState & AuthActions;

const DEFAULT_STATE: AuthState = {
    isAuthenticated: false,
    token: null,
};

export const createAuthSlice: StateCreator<
    StoreState,
    [["zustand/immer", never]],
    [],
    AuthSlice
> = (set) => ({
    ...DEFAULT_STATE,
    setToken: (token) =>
        set(() => ({
            token,
            isAuthenticated: true,
        })),
    clearAuth: () =>
        set(() => ({
            isAuthenticated: false,
            token: null,
        })),
});
