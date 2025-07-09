"use client";

import { useShallow } from "zustand/shallow";
import { useStore } from "./use-store";

const useCanvasStore = () => {
    const canvasStore = useStore(useShallow((state) => state));

    if (!canvasStore) throw Error("useCanvasStore used outside provider");

    return canvasStore;
};

export default useCanvasStore;
