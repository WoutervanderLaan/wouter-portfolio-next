"use client";

import { useEffect } from "react";
import useKeyPressContext from "./use-key-press-context";
import useDrawingContext from "./use-drawing-context";
import { ToolType } from "@/types/tool-type";
import { Zoom } from "./use-zoom";

const KEY_PRESS_MAP = [["b"], ["e"], ["m"], ["z"], ["shift"]] as const;

export const VALID_KEYS = new Set(KEY_PRESS_MAP.map(([key]) => key));

type KeyPressType = (typeof KEY_PRESS_MAP)[number][0];

const useKeyPressMapping = () => {
  const { pressedKeys } = useKeyPressContext();
  const { setType, type, setZoomType } = useDrawingContext();

  const KEY_MAPPING: Record<KeyPressType, () => void> = {
    b: () => setType(ToolType.BRUSH),
    e: () => setType(ToolType.ERASER),
    m: () => setType(ToolType.DRAG),
    z: () => setType(ToolType.ZOOM),
    shift: () => {
      if (type === ToolType.ZOOM) setZoomType(Zoom.OUT);
    },
  };

  useEffect(() => {
    if (!pressedKeys.length) {
      if (type === ToolType.ZOOM) setZoomType(Zoom.IN);
      return;
    }

    const formattedKeys = pressedKeys
      .map((key) => key.toLowerCase())
      .join(", ") as KeyPressType;

    // Ensure formattedKeys is in the valid key set before calling action
    if (VALID_KEYS.has(formattedKeys)) {
      KEY_MAPPING[formattedKeys]();
    }
  }, [pressedKeys]);
};

export default useKeyPressMapping;
