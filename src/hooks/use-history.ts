import { TLine } from "@/lib/types/line";
import { useCallback, useMemo, useState } from "react";
import useCanvasStore from "./store-hooks/use-canvas-store";

const useHistory = () => {
    const [redoStack, setRedoStack] = useState<
        Array<TLine & { index: number }>
    >([]);

    const { layers, setLayers, switchActiveLayer } = useCanvasStore();

    const noHistory = useMemo(
        () => layers.every((layer) => !layer.lines.length),
        [layers],
    );

    const undo = () => {
        if (noHistory) return;

        const mostRecentLines = layers.map(({ lines }, index) => ({
            ...lines[lines.length - 1],
            index,
        }));

        const mostRecentLine = mostRecentLines
            .filter((line) => line.timestamp)
            .sort((a, b) => b.timestamp - a.timestamp)[0];

        switchActiveLayer(mostRecentLine.index);

        setRedoStack((prev) => [...prev, mostRecentLine]);

        const newLayers = layers.map((layer, index) => {
            if (index === mostRecentLine.index)
                return {
                    lines: layer.lines.slice(0, -1),
                };

            return layer;
        });
        setLayers(newLayers);
    };

    const redo = () => {
        if (redoStack.length > 0) {
            const lineToAdd = redoStack[redoStack.length - 1];

            const newLayers = layers.map((layer, index) => {
                if (index === lineToAdd.index)
                    return {
                        lines: layer.lines.concat(lineToAdd),
                    };

                return layer;
            });
            setLayers(newLayers);

            switchActiveLayer(lineToAdd.index);

            setRedoStack(redoStack.slice(0, -1));
        }
    };

    const resetHistory = useCallback(() => setRedoStack([]), []);

    return { undo, redo, resetHistory, noHistory, redoStack };
};

export default useHistory;
