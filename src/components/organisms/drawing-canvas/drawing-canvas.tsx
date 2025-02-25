"use client";

import useCursor from "@/hooks/use-cursor";
import { useDrawingContext } from "@/hooks/use-drawing-context";
import clsx from "clsx";
import { Stage as StageKonva } from "konva/lib/Stage";
import React, { useRef } from "react";
import { Stage, Layer } from "react-konva";
import DrawingSettings from "../drawing-settings/drawing-settings";
import Cursor from "@/components/molecules/cursor/cursor";
import Line from "@/components/molecules/line/line";
import useDrawingEvents from "@/hooks/use-drawing-events";
import { smoothPoints } from "@/utils/drawing-helpers";
import { Zoom } from "@/hooks/use-zoom";
import { ToolType } from "@/types/tool-type";
import useDrag from "@/hooks/use-drag";

const DrawingCanvas = () => {
  const stageRef = useRef<StageKonva>(null);

  const { layers, size, type, scale, position, zoomType, zoom } =
    useDrawingContext();

  const { isDragging, ...dragProperties } = useDrag();

  const { cursor, handleCursor, resetCursor } = useCursor();

  const {
    handleEventStart,
    handleEventMove,
    handleEventEnd,
    handleEventLeave,
  } = useDrawingEvents();

  return (
    <div
      className={clsx(
        "absolute left-0 top-0 m-0 h-full w-full overflow-hidden",
      )}
    >
      <DrawingSettings stageRef={stageRef} />

      <Stage
        ref={stageRef}
        className={clsx(
          "cursor-none",
          {
            "cursor-grabbing": isDragging === true,
          },
          {
            "cursor-grab": type === ToolType.DRAG,
          },
          { "cursor-zoom-in": type === ToolType.ZOOM && zoomType === Zoom.IN },
          {
            "cursor-zoom-out": type === ToolType.ZOOM && zoomType === Zoom.OUT,
          },
        )}
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
        width={window.innerWidth}
        height={window.innerHeight}
        onTouchStart={(e) => {
          if (type === ToolType.DRAG) return;
          if (type === ToolType.ZOOM) return zoom(stageRef, zoomType);
          handleEventStart(e);
        }}
        onTouchMove={handleEventMove}
        onTouchEnd={handleEventEnd}
        onMouseLeave={() => {
          handleEventLeave();
          resetCursor();
        }}
        onPointerDown={(e) => {
          if (type === ToolType.DRAG) return;
          if (type === ToolType.ZOOM) return zoom(stageRef, zoomType);
          handleEventStart(e);
        }}
        onPointerMove={(e) => {
          handleEventMove(e);
          handleCursor(e);
        }}
        onPointerUp={handleEventEnd}
        scaleX={scale.x}
        scaleY={scale.y}
        {...position}
        {...dragProperties}
      >
        {layers.map(({ lines }, index) => (
          <Layer key={index}>
            {lines.map(({ points, ...rest }, i) => {
              const smoothedPoints = smoothPoints(points);
              return <Line key={i} {...rest} points={smoothedPoints} />;
            })}
          </Layer>
        ))}

        <Layer>
          {!!cursor && (
            <Cursor size={size} position={{ x: cursor.x, y: cursor.y }} />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default DrawingCanvas;
