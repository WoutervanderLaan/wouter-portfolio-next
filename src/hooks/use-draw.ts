"use client";

import { TLine } from "@/lib/types/line";
import { useCallback } from "react";
import useCanvasStore from "./store-hooks/use-canvas-store";

const useDraw = () => {
    const { layers, activeLayerIndex, setLayers } = useCanvasStore();

    const startLine = useCallback(
        (newLine: TLine) => {
            const newLayers = layers.map((layer, index) => {
                if (index === activeLayerIndex) {
                    return {
                        lines: [...layer.lines, newLine],
                    };
                }
                return layer;
            });
            setLayers(newLayers);
        },
        [activeLayerIndex, setLayers],
    );

    const updateLine = useCallback(
        (point: number[]) => {
            const activeLayerLines = layers[activeLayerIndex].lines;
            const lastLine = activeLayerLines[activeLayerLines.length - 1];
            // if (!lastLine) return;

            const updatedLine = {
                ...lastLine,
                points: lastLine.points.concat(point),
            };

            const newLines = activeLayerLines.slice(0, -1).concat(updatedLine);

            const newLayers = layers.map((layer, index) => {
                if (index === activeLayerIndex)
                    return {
                        lines: newLines,
                    };

                return layer;
            });

            setLayers(newLayers);
        },
        [activeLayerIndex, layers, setLayers],
    );

    return {
        startLine,
        updateLine,
    };
};

export default useDraw;
