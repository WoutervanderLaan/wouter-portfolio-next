import { useCallback, useMemo, useRef } from "react";
import useCanvasStore from "./store-hooks/use-canvas-store";
import { ToolType } from "@/lib/types/tool-type";

const useDrag = () => {
    const { type } = useCanvasStore();

    const isDragging = useRef(false);

    const draggable = useMemo(() => type === ToolType.DRAG, [type]);

    const onDragStart = useCallback(() => {
        isDragging.current = true;
    }, []);

    const onDragEnd = useCallback(() => {
        isDragging.current = false;
    }, []);

    return {
        draggable,
        onDragStart,
        onDragEnd,
        isDragging: isDragging.current,
    };
};

export default useDrag;
