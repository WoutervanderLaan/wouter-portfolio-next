export type MessageBase = {
    id: string;
    role: "user" | "assistant";
    content: string;
};

export type StreamedMessage = MessageBase & {
    stream: true;
};

export type StoredMessage = MessageBase & {
    timestamp: string;
    user_id?: string;
    image_filename?: string;
};

export type Message = StreamedMessage | StoredMessage;
