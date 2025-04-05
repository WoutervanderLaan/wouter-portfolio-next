import { TLayer } from "@/types/layer";
import { TLine } from "@/types/line";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";

type UseHistoryProps = {
  layers: Array<TLayer>;
  setLayers: Dispatch<SetStateAction<TLayer[]>>;
  switchActiveLayer: (index: number) => void;
};

const useHistory = ({
  layers,
  setLayers,
  switchActiveLayer,
}: UseHistoryProps) => {
  const [redoStack, setRedoStack] = useState<Array<TLine & { index: number }>>(
    [],
  );

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
      .filter((line) => line.timeStamp)
      .sort((a, b) => b.timeStamp - a.timeStamp)[0];

    switchActiveLayer(mostRecentLine.index);

    setRedoStack((prev) => [...prev, mostRecentLine]);

    setLayers((prev) =>
      prev.map((layer, index) => {
        if (index === mostRecentLine.index)
          return {
            lines: layer.lines.slice(0, -1),
          };

        return layer;
      }),
    );
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const lineToAdd = redoStack[redoStack.length - 1];

      setLayers((prev) =>
        prev.map((layer, index) => {
          if (index === lineToAdd.index)
            return {
              lines: layer.lines.concat(lineToAdd),
            };

          return layer;
        }),
      );

      switchActiveLayer(lineToAdd.index);

      setRedoStack(redoStack.slice(0, -1));
    }
  };

  const resetHistory = useCallback(() => setRedoStack([]), []);

  return { undo, redo, resetHistory, noHistory, redoStack };
};

export default useHistory;
