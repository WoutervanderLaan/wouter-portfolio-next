import Konva from "konva";
import useCanvasStore from "./store-hooks/use-canvas-store";
import { extractPoint } from "@/utils/drawing-helpers";
import { TLine } from "@/lib/types/line";
import useDraw from "./use-draw";
import { useRef } from "react";

const useDrawingEvents = () => {
    const {
        color,
        opacity,
        type,
        size,
        resetHistory,
        colorHistory,
        addColorToHistory,
    } = useCanvasStore();

    const { startLine, updateLine } = useDraw();

    const isDrawing = useRef(false);

    const handleEventStart = (
        e: Konva.KonvaEventObject<PointerEvent | TouchEvent | MouseEvent>,
    ) => {
        isDrawing.current = true;
        e.evt.preventDefault();
        const point = extractPoint(e);

        const newLine: TLine = {
            points: [...point, ...point],
            color,
            size,
            opacity: opacity / 100,
            type,
            timestamp: new Date().getTime(),
        };

        if (!colorHistory.includes(color)) addColorToHistory(color);

        startLine(newLine);
    };

    const handleEventMove = (
        e: Konva.KonvaEventObject<TouchEvent | MouseEvent>,
    ) => {
        if (!isDrawing.current) return;
        e.evt.preventDefault();
        const point = extractPoint(e);

        updateLine(point);
    };

    const handleEventEnd = () => {
        isDrawing.current = false;
        resetHistory();
    };

    const handleEventLeave = () => {
        isDrawing.current = false;
    };

    return {
        handleEventStart,
        handleEventMove,
        handleEventEnd,
        handleEventLeave,
    };
};

export default useDrawingEvents;
