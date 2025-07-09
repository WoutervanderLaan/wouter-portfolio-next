"use client";

import { Zoom } from "@/store/slices/canvas-slice";
import { Stage } from "konva/lib/Stage";
import { RefObject } from "react";
import useCanvasStore from "./store-hooks/use-canvas-store";

const SCALE_FACTOR = 1.2;
const MAX_ZOOM = 2;
const MIN_ZOOM = 0.5;

const useZoom = () => {
    const { setScale, setPosition } = useCanvasStore();

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

    return { zoom };
};

export default useZoom;
