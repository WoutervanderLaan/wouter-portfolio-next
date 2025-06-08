import Chat from "@/components/organisms/chat/chat";
import DrawingSettings from "@/components/organisms/drawing-settings/drawing-settings";
import { AuthProvider } from "@/context/auth-context";
import DrawingContextProvider from "@/context/drawing-context";
import makeServerRequest from "@/lib/network/make-server-request";

export type TMessageDB = {
    timestamp: string;
    user_input: string;
    id: string;
    model_input: string;
};

export default async function CanvasLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { data: history, error } = await makeServerRequest<
        Array<TMessageDB>,
        { detail: string }
    >({
        endpoint: "/history/db",
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
