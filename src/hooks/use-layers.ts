"use client";

import { TLayer } from "@/lib/types/layer";
import { useCallback, useState } from "react";

const EMPTY_LAYER = { lines: [] };
const DEFAULT_LAYERS: Array<TLayer> = [EMPTY_LAYER];

const useLayers = () => {
  const [layers, setLayers] = useState<Array<TLayer>>(DEFAULT_LAYERS);
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);

  const resetLayers = useCallback(() => {
    setLayers(DEFAULT_LAYERS);
    setActiveLayerIndex(0);
  }, []);

  const addLayer = useCallback(() => {
    setLayers((prev) => [...prev, EMPTY_LAYER]);
    setActiveLayerIndex(layers.length);
  }, [layers.length]);

  const removeLayer = useCallback(
    (layerIndex: number) => {
      const newLayers = layers.filter((_, index) => index !== layerIndex);
      setActiveLayerIndex(newLayers.length - 1);
      setLayers(newLayers);
    },
    [layers],
  );

  const switchActiveLayer = useCallback(
    (index: number) => setActiveLayerIndex(index),
    [],
  );

  return {
    layers,
    setLayers,
    addLayer,
    removeLayer,
    resetLayers,
    switchActiveLayer,
    activeLayerIndex,
  };
};

export default useLayers;
