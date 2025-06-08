export type MessageBase = {
    id: number | string;
    from: "user" | "assistant";
    text: string;
};

export type StreamedMessage = MessageBase & {
    stream: true;
};

export type StoredMessage = MessageBase & {
    timestamp: string;
};

export type Message = StreamedMessage | StoredMessage;
