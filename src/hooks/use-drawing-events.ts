import Konva from "konva";
import useDrawingContext from "./use-drawing-context";
import { extractPoint } from "@/utils/drawing-helpers";
import { TLine } from "@/lib/types/line";
import { MAX_COLOR_HISTORY } from "./use-brush-settings";

const useDrawingEvents = () => {
    const {
        color,
        opacity,
        type,
        size,
        isDrawing,
        startLine,
        updateLine,
        resetHistory,
        colorHistoryRef,
    } = useDrawingContext();

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

        if (!colorHistoryRef.current.includes(color))
            colorHistoryRef.current = [color, ...colorHistoryRef.current].slice(
                0,
                MAX_COLOR_HISTORY,
            );

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
