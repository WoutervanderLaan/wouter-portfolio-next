import DrawingSettings from "@/components/organisms/drawing-settings/drawing-settings";
import DrawingContextProvider from "@/context/drawing-context";
import KeyPressContextProvider from "@/context/key-press-context";

export default function CanvasLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <KeyPressContextProvider>
      <DrawingContextProvider>
        <DrawingSettings />
        {children}
      </DrawingContextProvider>
    </KeyPressContextProvider>
  );
}
