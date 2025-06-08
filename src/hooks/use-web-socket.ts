"use client";

import { useAuth } from "@/context/auth-context";
import { useState, useEffect, useRef, useCallback } from "react";

const useWebSocket = (
    url: string,
    onMessage: (event: MessageEvent<string>) => void,
) => {
    const socketRef = useRef<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth();

    const [reconnectCount, setReconnectCount] = useState(0);

    useEffect(() => {
        if (!token) return;

        const socket = new WebSocket(url, token);
        socketRef.current = socket;

        socket.onopen = () => {
            setError(null);
            setIsConnected(true);
        };

        socket.onmessage = (event: MessageEvent<string>) => onMessage(event);

        socket.onclose = (e) => {
            if (e.reason) setError(e.reason);
            setIsConnected(false);
        };

        return () => {
            socket.close();
        };
    }, [url, token, reconnectCount]);

    const sendText = useCallback((text: string) => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(text);
        }
    }, []);

    const reconnect = useCallback(() => {
        setReconnectCount((prev) => (prev += 1));
    }, []);

    return {
        isConnected,
        sendText,
        reconnect,
        error,
    };
};

export default useWebSocket;
