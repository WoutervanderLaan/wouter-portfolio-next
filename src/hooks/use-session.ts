"use client";

import makeRequest from "@/lib/network/make-request";
import { useEffect, useState } from "react";
import useAuth from "./use-auth";
import useSessionStore from "./store-hooks/use-session-store";

const useSession = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { sessionId, setSessionId } = useSessionStore();
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
                endpoint: "/visit/retrieve",
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
                endpoint: "/visit/reset",
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

    return { sessionId, isLoading, reset: resetSession };
};

export default useSession;
