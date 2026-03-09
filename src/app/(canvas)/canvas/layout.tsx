import BoardSettings from "@/components/organisms/board-settings/board-settings";
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
          <BoardSettings />
          {children}
          {chat}
        </main>
      </StageProvider>
    </StoreProvider>
  );
}
