"use client";

import makeRequest from "@/lib/network/make-request";
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

type TAuthContext = {
    isAuthenticated: boolean;
    token: string | null;
    logout: () => Promise<void>;
    login: (data: FormData) => Promise<void>;
};

const AuthContext = createContext<TAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
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
                    setIsAuthenticated(true);
                    setToken(response.data.access_token);
                }
            } catch (error) {
                console.error("[AUTH]", error);
            }
        };

        checkAuth();
    }, []);

    const logout = async () => {
        try {
            const response = await makeRequest<{
                status: number;
                message: string;
            }>({
                endpoint: "/auth/logout",
                method: "DELETE",
            });

            if (response.status !== 200) throw new Error("Error logging out");
            setToken(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error("[LOGOUT]", error);
        }
    };

    const login = async (data: FormData) => {
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
            setIsAuthenticated(true);
        } catch (error) {
            console.error("[LOGIN]", error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, logout, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) throw Error("AuthContext used outside Provider");

    return authContext;
};
