import Chat from "@/components/organisms/chat/chat";
import DrawingSettings from "@/components/organisms/drawing-settings/drawing-settings";
import { AuthProvider } from "@/context/auth-context";
import DrawingContextProvider from "@/context/drawing-context";
import makeServerRequest from "@/lib/network/make-server-request";
import { StoredMessage } from "@/lib/types/message";

export default async function CanvasLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { data: history, error } = await makeServerRequest<
        Array<StoredMessage>,
        { detail: string }
    >({
        endpoint: "/history",
        method: "GET",
    });

    return (
        <AuthProvider>
            <DrawingContextProvider>
                <main className="h-screen w-screen overflow-hidden">
                    <DrawingSettings />
                    {children}
                    <Chat history={history} error={error} />
                </main>
            </DrawingContextProvider>
        </AuthProvider>
    );
}
