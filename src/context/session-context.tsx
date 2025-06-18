"use client";

import makeRequest from "@/lib/network/make-request";
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { useAuth } from "./auth-context";

type TSessionContext = {
    isLoading: boolean;
    sessionId: string | null;
    reset: () => Promise<string | undefined>;
};

const SessionContext = createContext<TSessionContext | null>(null);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { token, isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) return;

        retrieveSession();
    }, [isAuthenticated]);

    const retrieveSession = async () => {
        setIsLoading(true);

        try {
            const response = await makeRequest<{ visit_id: string }>({
                method: "GET",
                endpoint: "/session/retrieve",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status !== 200)
                throw new Error("Error retrieving session.");

            if (response.data?.visit_id) {
                setSessionId(response.data.visit_id);
                return response.data.visit_id;
            }
        } catch (error) {
            console.error("[SESSION]", error);
        } finally {
            setIsLoading(false);
        }
    };

    const resetSession = async () => {
        if (!sessionId) return;
        setIsLoading(true);

        try {
            const response = await makeRequest<{
                visit_id: string;
            }>({
                method: "GET",
                endpoint: "/session/reset",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status !== 200)
                throw new Error("Error deleting session.");

            if (response.data?.visit_id) {
                setSessionId(response.data.visit_id);
                return response.data.visit_id;
            }
        } catch (error) {
            console.error("[SESSION]", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SessionContext.Provider
            value={{
                isLoading,
                sessionId,
                reset: resetSession,
            }}
        >
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => {
    const sessionContext = useContext(SessionContext);
    if (!sessionContext) throw Error("SessionContext used outside Provider");

    return sessionContext;
};
