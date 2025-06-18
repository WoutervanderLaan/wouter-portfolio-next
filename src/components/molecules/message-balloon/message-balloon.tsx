import Text from "@/components/atoms/text/text";
import { Message } from "@/lib/types/message";
import clsx from "clsx";
import Image from "next/image";

const ChatBalloon = (message: Message) => (
    <div
        key={message.id}
        className={clsx(
            "flex flex-col",
            {
                "translate-x-2": message.role === "user",
            },
            {
                "-translate-x-2": message.role === "assistant",
            },
        )}
    >
        <div
            className={clsx("flex flex-row justify-between", {
                "flex-row-reverse": message.role === "user",
            })}
        >
            <Text.Small>
                {message.role === "user" ? "You" : "Assistant"}
            </Text.Small>
        </div>
        <div
            className={clsx(
                "flex h-fit w-full flex-col gap-4 rounded-t-xl border border-black bg-white p-2",
                {
                    "rounded-bl-xl": message.role === "user",
                },
                {
                    "rounded-br-xl": message.role === "assistant",
                },
            )}
        >
            {"image_filename" in message && message.image_filename && (
                <Image
                    alt=""
                    width={100}
                    height={100}
                    className="self-center bg-gray-100 p-2"
                    src={`http://localhost:8000/history/image/${message.image_filename}`}
                />
            )}
            <Text.Paragraph>{message.content}</Text.Paragraph>

            {"timestamp" in message && (
                <Text.Small className="self-end">
                    {new Date(message.timestamp).toLocaleTimeString(undefined, {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </Text.Small>
            )}
        </div>
    </div>
);

const SystemBalloon = ({
    text,
    variant = "info",
}: {
    text: string;
    variant?: "info" | "error";
}) => (
    <div
        className={clsx(
            "self-center rounded-xl border px-4 py-2 text-center",
            { "border-red-500 bg-red-50": variant === "error" },
            {
                "border-yellow-600 bg-yellow-50": variant === "info",
            },
        )}
    >
        <Text.Small
            className={clsx(
                {
                    "text-red-500": variant === "error",
                },
                {
                    "text-yellow-600": variant === "info",
                },
            )}
        >
            {text}
        </Text.Small>
    </div>
);

const MessageBalloon = {
    CHAT: (message: Message) => <ChatBalloon {...message} />,
    INFO: ({ text }: { text: string }) => (
        <SystemBalloon variant="info" text={text} />
    ),
    ERROR: ({ text }: { text: string }) => (
        <SystemBalloon variant="error" text={text} />
    ),
};

export default MessageBalloon;
