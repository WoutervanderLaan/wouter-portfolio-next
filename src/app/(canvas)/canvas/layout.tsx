import DrawingSettings from "@/components/organisms/drawing-settings/drawing-settings";
import { AuthProvider } from "@/context/auth-context";
import DrawingContextProvider from "@/context/drawing-context";
import { SessionProvider } from "@/context/session-context";

export default async function CanvasLayout({
    children,
    chat,
}: Readonly<{
    children: React.ReactNode;
    chat: React.ReactNode;
}>) {
    return (
        <AuthProvider>
            <SessionProvider>
                <DrawingContextProvider>
                    <main className="h-screen w-screen overflow-hidden">
                        <DrawingSettings />
                        {children}
                        {chat}
                    </main>
                </DrawingContextProvider>
            </SessionProvider>
        </AuthProvider>
    );
}
