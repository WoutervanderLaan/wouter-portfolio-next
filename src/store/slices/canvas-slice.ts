import { TLayer } from "@/lib/types/layer";
import { TLine } from "@/lib/types/line";
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
    redoStack: Array<TLine & { index: number }>;
};

type HistoryActions = {
    resetHistory: () => void;
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

type ImageState = {
    images: CanvasElement[];
    selectedImageId: string | null;
};

type ImageActions = {
    addImage: (image: CanvasElement) => void;
    updateImage: (id: string, updates: Partial<CanvasElement>) => void;
    removeImage: (id: string) => void;
    selectImage: (id: string | null) => void;
    resetImages: () => void;
};

type CanvasState = BrushState &
    LayerState &
    HistoryState &
    ZoomState &
    ImageState;

type CanvasActions = BrushActions &
    LayerActions &
    HistoryActions &
    ZoomActions &
    ImageActions;

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
            colorHistory: [color, ...state.colorHistory].slice(
                0,
                MAX_COLOR_HISTORY,
            ),
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
            const layers = state.layers.filter(
                (_, index) => index !== layerIndex,
            );

            if (layers.length === 0) {
                return {
                    layers: [EMPTY_LAYER],
                    activeLayerIndex: 0,
                };
            }

            return {
                layers,
                activeLayerIndex: Math.min(
                    state.activeLayerIndex,
                    layers.length - 1,
                ),
            };
        }),
    resetLayers: () =>
        set(() => ({
            layers: DEFAULT_STATE.layers,
            activeLayerIndex: DEFAULT_STATE.activeLayerIndex,
        })),
    resetHistory: () =>
        set(() => ({
            redoStack: DEFAULT_STATE.redoStack,
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
});
