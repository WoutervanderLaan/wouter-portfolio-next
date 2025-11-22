import DrawingSettings from "@/components/organisms/drawing-settings/drawing-settings";
import StageProvider from "@/context/stage-context";
import StoreProvider from "@/context/store-context";

export default async function CanvasLayout({
    children,
    chat,
}: Readonly<{
    children: React.ReactNode;
    chat: React.ReactNode;
}>) {
    return (
        <StoreProvider>
            <StageProvider>
                <main className="h-screen w-screen overflow-hidden">
                    <DrawingSettings />
                    {children}
                    {chat}
                </main>
            </StageProvider>
        </StoreProvider>
    );
}
