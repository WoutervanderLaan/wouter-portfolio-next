"use client";

import { Stage } from "konva/lib/Stage";
import { RefObject, useState } from "react";

const SCALE_FACTOR = 1.2;
const MAX_ZOOM = 2;
const MIN_ZOOM = 0.5;

export enum Zoom {
  IN,
  OUT,
}

const useZoom = () => {
  const [scale, setScale] = useState({ x: 1, y: 1 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [zoomType, setZoomType] = useState<Zoom>(Zoom.OUT);

  const zoom = (stageRef: RefObject<Stage | null>, zoomType: Zoom) => {
    const stage = stageRef.current;

    if (!stage) throw Error("Unable to determine stage.");

    const pointer = stage?.getPointerPosition();

    if (!pointer) throw Error("Unable to determine pointer position.");

    const oldScale = stage.scaleX();

    const newScale =
      zoomType === Zoom.IN
        ? Math.min(MAX_ZOOM, oldScale * SCALE_FACTOR)
        : Math.max(MIN_ZOOM, oldScale / SCALE_FACTOR);

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    setScale({ x: newScale, y: newScale });
    setPosition({
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    });
  };

  return { scale, position, zoomType, setZoomType, zoom };
};

export default useZoom;
