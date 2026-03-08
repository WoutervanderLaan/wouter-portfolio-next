import { TLayer } from "@/lib/types/layer";
import { TLine } from "@/lib/types/line";
import { CanvasAction } from "@/lib/types/canvas-action";
import { Position } from "@/lib/types/position";
import { ToolType } from "@/lib/types/tool-type";
import { StateCreator } from "zustand";
import { StoreState } from "..";
import { CanvasElement } from "@/utils/canvas-utils";

export const MAX_COLOR_HISTORY = 8;

export enum Zoom {
  IN,
  OUT,
}

type BrushState = {
  type: ToolType;
  color: string;
  colorHistory: string[]; // maybe ref
  opacity: number;
  size: number;
};

type BrushActions = {
  setColor: (color: string) => void;
  addColorToHistory: (color: string) => void;
  setSize: (size: number) => void;
  setOpacity: (opacity: number) => void;
  setType: (type: ToolType) => void;
  resetBrush: () => void;
};

type LayerState = {
  layers: TLayer[];
  activeLayerIndex: number;
};

type LayerActions = {
  setLayers: (layers: TLayer[]) => void;
  switchActiveLayer: (index: number) => void;
  addLayer: () => void;
  removeLayer: (layerIndex: number) => void;
  resetLayers: () => void;
};

type HistoryState = {
  redoStack: CanvasAction[];
};

type HistoryActions = {
  undo: () => void;
  redo: () => void;
  resetRedoStack: () => void;
};

type ZoomState = {
  scale: Position;
  position: Position;
  zoomType: Zoom;
};

type ZoomActions = {
  setZoomType: (type: Zoom) => void;
  setScale: (scale: Position) => void;
  setPosition: (position: Position) => void;
};

type ElementState = {
  images: CanvasElement[];
  selectedImageId: string | null;
  selectedTextId: string | null;
};

type ElementActions = {
  addImage: (image: CanvasElement) => void;
  updateImage: (id: string, updates: Partial<CanvasElement>) => void;
  removeImage: (id: string) => void;
  selectImage: (id: string | null) => void;
  resetImages: () => void;
  addText: (text: CanvasElement) => void;
  updateText: (id: string, updates: Partial<CanvasElement>) => void;
  removeText: (id: string) => void;
  selectText: (id: string | null) => void;
};

type CanvasState = BrushState &
  LayerState &
  HistoryState &
  ZoomState &
  ElementState;

type CanvasActions = BrushActions &
  LayerActions &
  HistoryActions &
  ZoomActions &
  ElementActions;

export type CanvasSlice = CanvasState & CanvasActions;

const EMPTY_LAYER: { lines: TLine[] } = { lines: [] };

const DEFAULT_STATE: CanvasState = {
  type: ToolType.BRUSH,
  color: "#000000",
  colorHistory: [],
  opacity: 100,
  size: 5,
  layers: [EMPTY_LAYER],
  activeLayerIndex: 0,
  redoStack: [],
  scale: { x: 1, y: 1 },
  position: { x: 0, y: 0 },
  zoomType: Zoom.OUT,
  images: [],
  selectedImageId: null,
  selectedTextId: null,
};

export const createCanvasSlice: StateCreator<
  StoreState,
  [["zustand/immer", never]],
  [],
  CanvasSlice
> = (set) => ({
  ...DEFAULT_STATE,
  setColor: (color) =>
    set(() => ({
      color,
    })),
  addColorToHistory: (color) =>
    set((state) => ({
      colorHistory: [color, ...state.colorHistory].slice(0, MAX_COLOR_HISTORY),
    })),
  setSize: (size) =>
    set(() => ({
      size,
    })),
  setOpacity: (opacity) =>
    set(() => ({
      opacity,
    })),
  setType: (type) =>
    set(() => ({
      type,
    })),
  resetBrush: () =>
    set(() => ({
      color: DEFAULT_STATE.color,
      size: DEFAULT_STATE.size,
      opacity: DEFAULT_STATE.opacity,
      type: DEFAULT_STATE.type,
    })),
  setLayers: (layers) =>
    set(() => ({
      layers,
    })),
  switchActiveLayer: (activeLayerIndex) =>
    set(() => ({
      activeLayerIndex,
    })),
  addLayer: () =>
    set((state) => ({
      layers: [...state.layers, EMPTY_LAYER],
      activeLayerIndex: state.layers.length,
    })),
  removeLayer: (layerIndex) =>
    set((state) => {
      const layers = state.layers.filter((_, index) => index !== layerIndex);

      if (layers.length === 0) {
        return {
          layers: [EMPTY_LAYER],
          activeLayerIndex: 0,
        };
      }

      return {
        layers,
        activeLayerIndex: Math.min(state.activeLayerIndex, layers.length - 1),
      };
    }),
  resetLayers: () =>
    set(() => ({
      layers: DEFAULT_STATE.layers,
      activeLayerIndex: DEFAULT_STATE.activeLayerIndex,
    })),
  undo: () =>
    set((state) => {
      // Find the most recent line across all layers (by index tracking)
      let mostRecentTimestamp = 0;
      let mostRecentLineLayerIndex = -1;

      state.layers.forEach((layer, index) => {
        const lastLine = layer.lines[layer.lines.length - 1];
        if (lastLine && lastLine.timestamp > mostRecentTimestamp) {
          mostRecentTimestamp = lastLine.timestamp;
          mostRecentLineLayerIndex = index;
        }
      });

      // Find the most recent element
      let mostRecentElementIndex = -1;
      let mostRecentElementTimestamp = 0;
      state.images.forEach((el, index) => {
        if (el.timestamp > mostRecentElementTimestamp) {
          mostRecentElementTimestamp = el.timestamp;
          mostRecentElementIndex = index;
        }
      });

      // Nothing to undo
      if (mostRecentTimestamp === 0 && mostRecentElementTimestamp === 0)
        return {};

      if (
        mostRecentTimestamp >= mostRecentElementTimestamp &&
        mostRecentLineLayerIndex >= 0
      ) {
        // Undo the line
        const targetLayer = state.layers[mostRecentLineLayerIndex];
        const line = targetLayer.lines[targetLayer.lines.length - 1];

        return {
          layers: state.layers.map((layer, index) =>
            index === mostRecentLineLayerIndex
              ? { lines: layer.lines.slice(0, -1) }
              : layer,
          ),
          redoStack: [
            ...state.redoStack,
            {
              actionType: "line" as const,
              line: { ...line } as TLine,
              layerIndex: mostRecentLineLayerIndex,
            },
          ],
        };
      } else if (mostRecentElementIndex >= 0) {
        // Undo the element
        const element = state.images[mostRecentElementIndex];
        const elementId = element.id;

        return {
          images: state.images.filter((el) => el.id !== elementId),
          redoStack: [
            ...state.redoStack,
            {
              actionType: "element" as const,
              element: { ...element } as CanvasElement,
            },
          ],
          selectedImageId:
            state.selectedImageId === elementId
              ? null
              : state.selectedImageId,
          selectedTextId:
            state.selectedTextId === elementId
              ? null
              : state.selectedTextId,
        };
      }

      return {};
    }),
  redo: () =>
    set((state) => {
      if (state.redoStack.length === 0) return {};

      const action = state.redoStack[state.redoStack.length - 1];
      const newRedoStack = state.redoStack.slice(0, -1);

      if (action.actionType === "line") {
        // Ensure the target layer exists
        const layers = [...state.layers];
        while (layers.length <= action.layerIndex) {
          layers.push({ lines: [] });
        }

        return {
          layers: layers.map((layer, index) =>
            index === action.layerIndex
              ? { lines: [...layer.lines, action.line] }
              : layer,
          ),
          redoStack: newRedoStack,
        };
      } else {
        // Redo the element
        return {
          images: [...state.images, action.element],
          redoStack: newRedoStack,
        };
      }
    }),
  resetRedoStack: () =>
    set(() => ({
      redoStack: [],
    })),
  setZoomType: (zoomType) =>
    set(() => ({
      zoomType,
    })),
  setScale: (scale) =>
    set(() => ({
      scale,
    })),
  setPosition: (position) =>
    set(() => ({
      position,
    })),
  addImage: (image) =>
    set((state) => ({
      images: [...state.images, image],
      redoStack: [],
    })),
  selectImage: (id) =>
    set(() => ({
      selectedImageId: id,
    })),
  updateImage: (id, updates) =>
    set((state) => ({
      images: state.images.map((img) =>
        img.id === id ? { ...img, ...updates } : img,
      ),
    })),
  removeImage: (id) =>
    set((state) => ({
      images: state.images.filter((img) => img.id !== id),
      selectedImageId:
        state.selectedImageId === id ? null : state.selectedImageId,
    })),
  resetImages: () =>
    set(() => ({
      images: DEFAULT_STATE.images,
      selectedImageId: DEFAULT_STATE.selectedImageId,
    })),
  addText: (text) =>
    set((state) => ({
      images: [...state.images, text],
      redoStack: [],
    })),
  updateText: (id, updates) =>
    set((state) => ({
      images: state.images.map((element) =>
        element.id === id ? { ...element, ...updates } : element,
      ),
    })),
  removeText: (id) =>
    set((state) => ({
      images: state.images.filter((element) => element.id !== id),
      selectedTextId: state.selectedTextId === id ? null : state.selectedTextId,
    })),
  selectText: (id) =>
    set(() => ({
      selectedTextId: id,
    })),
});
