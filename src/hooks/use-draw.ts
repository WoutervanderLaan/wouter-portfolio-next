"use client";

import { TLayer } from "@/types/layer";
import { TLine } from "@/types/line";
import { Dispatch, SetStateAction, useCallback } from "react";

type UseDrawProps = {
  layers: Array<TLayer>;
  activeLayerIndex: number;
  setLayers: Dispatch<SetStateAction<Array<TLayer>>>;
};

const useDraw = ({ layers, activeLayerIndex, setLayers }: UseDrawProps) => {
  const startLine = useCallback(
    (newLine: TLine) => {
      setLayers((prev) =>
        prev.map((layer, index) => {
          if (index === activeLayerIndex) {
            return {
              lines: [...layer.lines, newLine],
            };
          }
          return layer;
        }),
      );
    },
    [activeLayerIndex, setLayers],
  );

  const updateLine = useCallback(
    (point: number[]) => {
      const activeLayerLines = layers[activeLayerIndex].lines;
      const lastLine = activeLayerLines[activeLayerLines.length - 1];

      lastLine.points = lastLine.points.concat(point);

      const newLines = activeLayerLines.slice(0, -1).concat(lastLine);

      setLayers((prev) =>
        prev.map((layer, index) => {
          if (index === activeLayerIndex)
            return {
              lines: newLines,
            };

          return layer;
        }),
      );
    },
    [activeLayerIndex, layers, setLayers],
  );

  return {
    startLine,
    updateLine,
  };
};

export default useDraw;
