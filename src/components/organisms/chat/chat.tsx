"use client";

import Button from "@/components/atoms/button/button";
import Sidebar from "@/components/molecules/sidebar/sidebar";
import useWebSocket from "@/hooks/use-web-socket";
import clsx from "clsx";
import { Fragment, useEffect, useRef, useState } from "react";
import { MessageBase, StoredMessage } from "@/lib/types/message";
import MessageBalloon from "@/components/molecules/message-balloon/message-balloon";
import AuthLayout from "@/components/templates/auth-layout/auth-layout";
import ChatForm from "../forms/chat-form";
import Text from "@/components/atoms/text/text";
import useDrawingContext from "@/hooks/use-drawing-context";
import makeRequest from "@/lib/network/make-request";
import { useAuth } from "@/context/auth-context";
import { calculateBoundingBox } from "@/utils/drawing-helpers";
import { useSession } from "@/context/session-context";

export default function Chat({
    history,
    error: historyError,
}: {
    history: Array<StoredMessage>;
    error?: { detail: string };
}) {
    const [messages, setMessages] = useState<{
        [key: string]: Array<StoredMessage>;
    }>(
        history.reduce((acc: { [key: string]: Array<StoredMessage> }, msg) => {
            if (!acc[msg.session_id]) acc[msg.session_id] = [];
            acc[msg.session_id] = [...acc[msg.session_id], msg];
            return acc;
        }, {}),
    );
    const [incomingMessage, setIncomingMessage] = useState("");
    const incomingMessageRef = useRef("");
    const { stageRef, layers } = useDrawingContext();
    const { sessionId } = useSession();
    const { token } = useAuth();

    const { isConnected, sendText, reconnect, error } = useWebSocket(
        `ws://localhost:8000/chat/ws`,
        (e) => {
            if (e.data === "[END]") {
                addMessage({
                    role: "assistant",
                    content: incomingMessageRef.current,
                });
                setIncomingMessage("");
                incomingMessageRef.current = "";
                return;
            }
            setIncomingMessage((prev) => (prev += e.data));
            incomingMessageRef.current += e.data;
        },
        [sessionId],
    );

    const addMessage = (message: Omit<MessageBase, "id">) => {
        if (!sessionId) {
            console.error("Cannot add message: No active session");
            return;
        }

        setMessages((prev) => {
            const newMessage: StoredMessage = {
                ...message,
                session_id: sessionId,
                timestamp: new Date(Date.now()).toISOString(),
                id: String(Math.random()), // local placeholder id
                user_id: String(Math.random()), // local placeholder id
            };

            const hasSessionMessages = Object.hasOwn(prev, sessionId);

            const newMessages = {
                ...prev,
                [sessionId]: hasSessionMessages
                    ? [...prev[sessionId], newMessage]
                    : [newMessage],
            };

            return newMessages;
        });
    };

    const sendSnapshotForCritique = async () => {
        if (!stageRef.current) return;
        const { lines } = layers[0];
        const { width, height, minX, minY } = calculateBoundingBox(lines);

        const blob = (await stageRef.current.toBlob({
            quality: 1,
            pixelRatio: 2,
            mimeType: "image/png",
            width,
            height,
            x: minX,
            y: minY,
        })) as Blob;

        const formData = new FormData();

        formData.append("file", blob);

        const res = await makeRequest({
            method: "POST",
            endpoint: "/chat/image-critique",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log(res); // TODO: refine call and move to seperate file
    };

    useEffect(() => {
        const amountOfLines = layers[0].lines.length;
        if (amountOfLines > 0 && amountOfLines % 10 === 0)
            sendSnapshotForCritique();
    }, [layers[0].lines.length]);

    return (
        <Sidebar side="right" className="h-full">
            <AuthLayout className="flex h-full w-80 flex-col border-l border-black bg-white p-4 pt-2">
                {(logout) => (
                    <div className="flex h-full flex-col gap-4">
                        <div className="flex w-full flex-row items-center gap-2">
                            <div
                                className={clsx(
                                    "h-2 w-2 rounded-full bg-gray-400",
                                    {
                                        "bg-green-300 ring-1 ring-green-300 ring-offset-2":
                                            isConnected,
                                    },
                                )}
                            />
                            {!isConnected && (
                                <Button
                                    variant="link"
                                    onPress={reconnect}
                                    className="decoration-gray-400"
                                >
                                    <Text.Paragraph className="text-gray-500">
                                        Reconnect
                                    </Text.Paragraph>
                                </Button>
                            )}
                            {error && (
                                <Text.Small className="text-red-500">
                                    {`[${error}]`}
                                </Text.Small>
                            )}
                            <Button
                                variant="secondary"
                                className="ml-auto"
                                onPress={logout}
                            >
                                <Text.Paragraph>Log out</Text.Paragraph>
                            </Button>
                        </div>
                        <div
                            className="flex w-full flex-1 flex-col gap-2 overflow-x-hidden overflow-y-scroll border border-black bg-gray-50 pb-2"
                            ref={(messagesEndRef) => {
                                if (messagesEndRef) {
                                    messagesEndRef.scrollTop =
                                        messagesEndRef.scrollHeight;
                                }
                            }}
                        >
                            {Boolean(historyError) && (
                                <MessageBalloon.ERROR text="Unable to retrieve chat history" />
                            )}

                            {Object.entries(messages).map(
                                ([session, msgArray]) => (
                                    <Fragment key={session}>
                                        <div className="flex flex-col gap-2 p-4">
                                            {msgArray.map((message) => (
                                                <MessageBalloon.CHAT
                                                    key={message.id}
                                                    {...message}
                                                />
                                            ))}
                                        </div>
                                        {session !== sessionId && (
                                            <div className="relative mb-4 mt-6 w-full border-t border-dashed border-green-500">
                                                <MessageBalloon.INFO
                                                    text="Visit reset"
                                                    className="absolute left-[50%] top-0 z-10 translate-x-[-50%] translate-y-[-50%]"
                                                />
                                            </div>
                                        )}
                                    </Fragment>
                                ),
                            )}

                            {Boolean(incomingMessage.length) && (
                                <div className="p-4">
                                    <MessageBalloon.CHAT
                                        role="assistant"
                                        content={incomingMessage}
                                        stream
                                        id={String(Math.random())}
                                    />
                                </div>
                            )}
                            {!isConnected && (
                                <MessageBalloon.WARN text="Disconnected" />
                            )}
                        </div>

                        <ChatForm
                            isDisabled={!isConnected}
                            onSubmit={(text) => {
                                addMessage({ role: "user", content: text });
                                sendText(text);
                            }}
                        />
                    </div>
                )}
            </AuthLayout>
        </Sidebar>
    );
}
