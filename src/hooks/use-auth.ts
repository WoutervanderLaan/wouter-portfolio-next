"use client";

import makeRequest from "@/lib/network/make-request";
import { useCallback, useEffect } from "react";
import useAuthStore from "./store-hooks/use-auth-store";

const useAuth = () => {
    const { isAuthenticated, clearAuth, token, setToken } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = useCallback(async () => {
        try {
            const response = await makeRequest<
                {
                    status: number;
                    access_token: string;
                    token_type: string;
                },
                { detail: string }
            >({
                endpoint: "/auth/refresh",
                method: "GET",
            });

            if (response.data) {
                setToken(response.data.access_token);
            }
        } catch (error) {
            console.error("[AUTH]", error);
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            const response = await makeRequest<{
                status: number;
                message: string;
            }>({
                endpoint: "/auth/logout",
                method: "DELETE",
            });

            if (response.status !== 200) throw new Error("Error logging out");
            clearAuth();
        } catch (error) {
            console.error("[LOGOUT]", error);
        }
    }, []);

    const login = useCallback(async (data: FormData) => {
        try {
            const password = data.get("password");
            const username = data.get("username");

            if (!password || !username) throw Error("Missing credentials");

            const formBody = new URLSearchParams();
            formBody.append("username", username.toString());
            formBody.append("password", password.toString());

            const response = await makeRequest<{
                status: number;
                access_token: string;
                token_type: string;
            }>({
                endpoint: "/auth/login",
                method: "POST",
                body: formBody,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            if (!response.data) throw Error("Error logging in");

            setToken(response.data.access_token);
        } catch (error) {
            console.error("[LOGIN]", error);
        }
    }, []);

    return { token, isAuthenticated, logout, login, checkAuth };
};

export default useAuth;
