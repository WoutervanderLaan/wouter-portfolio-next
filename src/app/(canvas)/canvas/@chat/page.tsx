import Chat from "@/components/organisms/chat/chat";
import makeServerRequest from "@/lib/network/make-server-request";
import { StoredMessage } from "@/lib/types/message";

export default async function ChatPage() {
    const { data: history, error } = await makeServerRequest<
        Array<StoredMessage>,
        { detail: string }
    >({
        endpoint: "/history",
        method: "GET",
    });

    return <Chat history={history} error={error} />;
}
