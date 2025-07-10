"use client";

import { useShallow } from "zustand/shallow";
import { useStore } from "./use-store";
import { CanvasSlice } from "@/store/slices/canvas-slice";

const useCanvasStore = () => {
    const canvasStore: CanvasSlice = useStore(
        useShallow((state) => ({
            type: state.type,
            color: state.color,
            colorHistory: state.colorHistory,
            opacity: state.opacity,
            size: state.size,
            layers: state.layers,
            activeLayerIndex: state.activeLayerIndex,
            redoStack: state.redoStack,
            scale: state.scale,
            position: state.position,
            zoomType: state.zoomType,
            images: state.images,
            selectedImageId: state.selectedImageId,
            setColor: state.setColor,
            addColorToHistory: state.addColorToHistory,
            setSize: state.setSize,
            setOpacity: state.setOpacity,
            setType: state.setType,
            resetBrush: state.resetBrush,
            setLayers: state.setLayers,
            switchActiveLayer: state.switchActiveLayer,
            addLayer: state.addLayer,
            removeLayer: state.removeLayer,
            resetLayers: state.resetLayers,
            resetHistory: state.resetHistory,
            setZoomType: state.setZoomType,
            setScale: state.setScale,
            setPosition: state.setPosition,
            addImage: state.addImage,
            updateImage: state.updateImage,
            removeImage: state.removeImage,
            selectImage: state.selectImage,
            resetImages: state.resetImages,
        })),
    );

    if (!canvasStore) throw Error("useCanvasStore used outside provider");
    return canvasStore;
};

export default useCanvasStore;
