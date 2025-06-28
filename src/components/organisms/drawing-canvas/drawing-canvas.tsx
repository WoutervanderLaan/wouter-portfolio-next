"use client";

import useCursor from "@/hooks/use-cursor";
import useDrawingContext from "@/hooks/use-drawing-context";
import clsx from "clsx";
import { Stage, Layer } from "react-konva";
import Cursor from "@/components/molecules/cursor/cursor";
import Line from "@/components/molecules/line/line";
import useDrawingEvents from "@/hooks/use-drawing-events";
import { smoothPoints } from "@/utils/drawing-helpers";
import { Zoom } from "@/hooks/use-zoom";
import { ToolType } from "@/lib/types/tool-type";
import useDrag from "@/hooks/use-drag";
import { MotionDiv } from "@/components/atoms/motion-element/motion-element";

const DrawingCanvas = () => {
    const { layers, type, scale, position, zoomType, zoom, stageRef } =
        useDrawingContext();

    const dragProperties = useDrag();

    const { cursor, handleCursor, resetCursor } = useCursor();

    const {
        handleEventStart,
        handleEventMove,
        handleEventEnd,
        handleEventLeave,
    } = useDrawingEvents();

    return (
        <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
        >
            <Stage
                ref={stageRef}
                className={clsx(
                    "border-1 absolute left-0 top-0 m-0 h-full w-full cursor-none overflow-hidden border bg-white",
                    {
                        "cursor-move": type === ToolType.DRAG,
                    },
                    {
                        "cursor-zoom-in":
                            type === ToolType.ZOOM && zoomType === Zoom.IN,
                    },
                    {
                        "cursor-zoom-out":
                            type === ToolType.ZOOM && zoomType === Zoom.OUT,
                    },
                )}
                style={{
                    backgroundImage: `
                  linear-gradient(45deg, rgba(0,0,0,0.05) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.05) 75%),
                  linear-gradient(45deg, rgba(0,0,0,0.05) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.05) 75%)
                `,
                    backgroundSize: "20px 20px",
                    backgroundPosition: "0 0, 10px 10px",
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
                            return (
                                <Line
                                    key={i}
                                    {...rest}
                                    points={smoothedPoints}
                                />
                            );
                        })}
                    </Layer>
                ))}

                <Layer>{cursor && <Cursor position={cursor} />}</Layer>
            </Stage>
        </MotionDiv>
    );
};

export default DrawingCanvas;
