"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useRef,
} from "react";

import { TLayer } from "@/lib/types/layer";
import useBrushSettings from "@/hooks/use-brush-settings";
import useLayers from "@/hooks/use-layers";
import useHistory from "@/hooks/use-history";
import useDraw from "@/hooks/use-draw";
import { TLine } from "@/lib/types/line";
import { ToolType } from "@/lib/types/tool-type";
import useZoom, { Zoom } from "@/hooks/use-zoom";
import { Position } from "@/lib/types/position";
import { Stage } from "konva/lib/Stage";

type T = {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  size: number;
  setSize: Dispatch<SetStateAction<number>>;
  opacity: number;
  setOpacity: Dispatch<SetStateAction<number>>;
  type: ToolType;
  setType: Dispatch<SetStateAction<ToolType>>;
  colorHistoryRef: RefObject<string[]>;
};

type L = {
  layers: TLayer[];
  setLayers: Dispatch<SetStateAction<TLayer[]>>;
  addLayer: () => void;
  removeLayer: (layerIndex: number) => void;
  resetLayers: () => void;
  switchActiveLayer: (index: number) => void;
  activeLayerIndex: number;
};

type H = {
  undo: () => void;
  redo: () => void;
  resetHistory: () => void;
  noHistory: boolean;
  redoStack: Array<TLine & { index: number }>;
};

type D = {
  startLine: (newLine: TLine) => void;
  updateLine: (point: number[]) => void;
};

type Z = {
  scale: Position;
  position: Position;
  zoomType: Zoom;
  setZoomType: Dispatch<SetStateAction<Zoom>>;
  zoom: (stageRef: RefObject<Stage | null>, zoomType: Zoom) => void;
};

type DrawingContext = T &
  L &
  H &
  D &
  Z & {
    isDrawing: RefObject<boolean>;
    stageRef: RefObject<Stage | null>;
  };

export const DrawingContext = createContext<DrawingContext | null>(null);

const DrawingContextProvider = ({ children }: { children: ReactNode }) => {
  const brushSettings = useBrushSettings();
  const zoomSettings = useZoom();
  const layerActions = useLayers();
  const historyActions = useHistory(layerActions);
  const drawActions = useDraw({ ...layerActions, ...brushSettings });
  const isDrawing = useRef(false);
  const stageRef = useRef<Stage>(null);

  return (
    <DrawingContext.Provider
      value={{
        ...brushSettings,
        ...zoomSettings,
        ...layerActions,
        ...historyActions,
        ...drawActions,
        isDrawing,
        stageRef,
      }}
    >
      {children}
    </DrawingContext.Provider>
  );
};

export default DrawingContextProvider;
