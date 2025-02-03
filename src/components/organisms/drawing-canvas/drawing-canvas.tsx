"use client";

import Button from "@/components/atoms/button/button";
import Text from "@/components/atoms/text/text";
import Arrow from "@/components/icons/arrow";
import { useThemeContext } from "@/hooks/use-theme";
import clsx from "clsx";
import Konva from "konva";
import { Line as LineKonva } from "konva/lib/shapes/Line";
import { Stage as StageKonva } from "konva/lib/Stage";
import React, { useMemo, useRef, useState } from "react";
import { Stage, Layer, Circle, Shape, Line } from "react-konva";

type BrushType = "brush" | "eraser";

type TLine = {
  points: number[];
  color: string;
  size: number;
  opacity: number;
  softness: number;
  type: BrushType;
  timeStamp: number;
};

type TLayer = {
  lines: Array<TLine>;
};

type Location = {
  x: number;
  y: number;
};

interface DrawingCanvasProps {
  debugMode?: boolean;
}

const EMPTY_LAYER = { lines: [] };
const DEFAULT_LAYERS: Array<TLayer> = [EMPTY_LAYER];
// const zoom = 2;

const smoothPoints = (points: number[], iterations = 2) => {
  for (let i = 0; i < iterations; i++) {
    const smoothed = [];
    for (let j = 0; j < points.length - 2; j += 2) {
      const x1 = points[j];
      const y1 = points[j + 1];
      const x2 = points[j + 2];
      const y2 = points[j + 3];

      // Generate Q and R points
      const qx = 0.75 * x1 + 0.25 * x2;
      const qy = 0.75 * y1 + 0.25 * y2;
      const rx = 0.25 * x1 + 0.75 * x2;
      const ry = 0.25 * y1 + 0.75 * y2;

      smoothed.push(qx, qy, rx, ry);
    }

    // Add the last point
    smoothed.push(points[points.length - 2], points[points.length - 1]);
    points = smoothed;
  }
  return points;
};

const DrawingCanvas = ({ debugMode }: DrawingCanvasProps) => {
  const [cursor, setCursor] = useState<Location | null>(null);
  const [layers, setLayers] = useState<Array<TLayer>>(DEFAULT_LAYERS);
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const [redoStack, setRedoStack] = useState<Array<TLine & { index: number }>>(
    [],
  );
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(5);
  const [opacity, setOpacity] = useState(100);
  const [softness, setSoftness] = useState(0);
  const isDrawing = useRef(false);
  const stageRef = useRef<StageKonva>(null);
  const lineRef = useRef<LineKonva>(null);
  const [type, setType] = useState<BrushType>("brush");
  const [zoom, setZoom] = useState(2);

  const { isDarkMode } = useThemeContext();

  const isEmptyCanvas = useMemo(
    () => layers.every((layer) => !layer.lines.length),
    [layers],
  );

  const handlePointerDown = (
    e: Konva.KonvaEventObject<MouseEvent | TouchEvent | PointerEvent>,
  ) => {
    if ("pressure" in e.evt) console.log(e.evt.pressure);
    isDrawing.current = true;
    const pos = e.target.getStage()?.getPointerPosition();
    if (pos?.x && pos?.y)
      setLayers((prev) =>
        prev.map((layer, index) => {
          if (index === activeLayerIndex) {
            const newLine: TLine = {
              points: [pos.x * zoom, pos.y * zoom, pos.x * zoom, pos.y * zoom],
              color,
              size,
              opacity: opacity / 100,
              softness: softness / 100,
              type,
              timeStamp: new Date().getTime(),
            };
            return {
              lines: [...layer.lines, newLine],
            };
          }
          return layer;
        }),
      );
  };

  const handleCursor = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    const point = stage?.getPointerPosition();
    if (!point) return;
    setCursor({ x: point.x * zoom, y: point.y * zoom });
  };

  const handlePointerMove = (
    e: Konva.KonvaEventObject<MouseEvent | TouchEvent | PointerEvent>,
  ) => {
    if ("pressure" in e.evt) console.log(e.evt.pressure);
    if (!isDrawing.current) return;

    e.evt.preventDefault();

    const stage = e.target.getStage();
    const point = stage?.getPointerPosition();
    if (!point) return;
    const activeLayerLines = layers[activeLayerIndex].lines;
    const lastLine = activeLayerLines[activeLayerLines.length - 1];

    lastLine.points = lastLine.points.concat([point.x * zoom, point.y * zoom]);

    const newLines = activeLayerLines.slice(0, -1).concat(lastLine);

    setLayers((prev) =>
      prev.map((layer, index) => {
        if (index === activeLayerIndex)
          return {
            lines: newLines,
          };

        return layer;
      }),
    );
  };

  const handlePointerUp = () => {
    isDrawing.current = false;
    setRedoStack([]);
  };

  const clearCanvas = () => {
    setLayers(DEFAULT_LAYERS);
    setRedoStack([]);
    setActiveLayerIndex(0);
  };

  const undo = () => {
    if (!isEmptyCanvas) {
      const mostRecentLines = layers.map(({ lines }, index) => ({
        ...lines[lines.length - 1],
        index,
      }));

      const mostRecentLine = mostRecentLines
        .filter((line) => line.timeStamp)
        .sort((a, b) => b.timeStamp - a.timeStamp)[0];

      setActiveLayerIndex(mostRecentLine.index);

      setRedoStack((prev) => [...prev, mostRecentLine]);

      setLayers((prev) =>
        prev.map((layer, index) => {
          if (index === mostRecentLine.index)
            return {
              lines: layer.lines.slice(0, -1),
            };

          return layer;
        }),
      );
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const lineToAdd = redoStack[redoStack.length - 1];

      setLayers((prev) =>
        prev.map((layer, index) => {
          if (index === lineToAdd.index)
            return {
              lines: layer.lines.concat(lineToAdd),
            };

          return layer;
        }),
      );

      setActiveLayerIndex(lineToAdd.index);

      setRedoStack(redoStack.slice(0, -1));
    }
  };

  const saveCanvas = () => {
    const uri = stageRef.current?.toDataURL();
    if (!uri) return;
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = uri;
    link.click();
  };

  const handleAddLayer = () => {
    setLayers((prev) => [...prev, EMPTY_LAYER]);
    setActiveLayerIndex(layers.length);
  };

  const handleRemoveLayer = (layerIndex: number) => {
    const newLayers = layers.filter((_, index) => index !== layerIndex);
    setActiveLayerIndex(newLayers.length - 1);
    setLayers(newLayers);
  };

  return (
    <div
      className={clsx(
        "absolute left-0 top-0 m-0 h-full w-full overflow-hidden",
        {
          "border-2 border-dashed border-black": debugMode,
        },
      )}
    >
      <div
        className={clsx(
          "absolute left-0 top-0 z-10 border-[1px] border-black bg-white",
          {
            "border-2 border-dashed border-blue-500": debugMode,
          },
        )}
      >
        <div className="flex flex-col gap-2 p-4">
          <label className="flex flex-row items-center gap-2">
            <input
              type="color"
              disabled={type === "eraser"}
              aria-label="brush color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="aspect-square h-full w-full"
            />
          </label>

          <label className="flex flex-col">
            <Text.Small>Size: {size}</Text.Small>

            <input
              type="range"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              min={1}
              max={200}
            />
          </label>

          <label className="flex flex-col">
            <Text.Small>Opacity: {opacity}</Text.Small>

            <input
              type="range"
              value={opacity}
              onChange={(e) => setOpacity(parseInt(e.target.value))}
              min={0}
              max={100}
            />
          </label>

          {/* <label className="flex flex-col">
            <Text.Small>Softness: {softness}</Text.Small>

            <input
              type="range"
              value={softness}
              onChange={(e) => setSoftness(parseInt(e.target.value))}
              min={0}
              max={100}
            />
          </label> */}

          <div className="flex flex-row gap-2">
            <Button
              onPress={undo}
              variant="primary"
              className="self-start"
              isDisabled={isEmptyCanvas}
            >
              <Arrow color={isDarkMode ? "black" : "white"} />
            </Button>
            <Button
              onPress={redo}
              variant="primary"
              className="self-start"
              isDisabled={!redoStack.length}
            >
              <Arrow color={isDarkMode ? "black" : "white"} direction="right" />
            </Button>
          </div>
          <div className="flex flex-row gap-2">
            <Button
              onPress={() => setZoom((prev) => prev + 1)}
              variant="primary"
              className="self-start"
              isDisabled={zoom === 3}
            >
              <Text.Small className="text-white dark:text-black">-</Text.Small>
            </Button>
            <Button
              onPress={() => setZoom((prev) => prev - 1)}
              variant="primary"
              className="self-start"
              isDisabled={zoom === 0}
            >
              <Text.Small className="text-white dark:text-black">+</Text.Small>
            </Button>
          </div>
          <div className="flex flex-row gap-2">
            <Button
              onPress={clearCanvas}
              variant="primary"
              className="self-start"
            >
              <Text.Small className="text-white dark:text-black">
                Clear
              </Text.Small>
            </Button>
            <Button
              onPress={saveCanvas}
              variant="primary"
              className="self-start"
              isDisabled={isEmptyCanvas}
            >
              <Text.Small className="text-white dark:text-black">
                Save
              </Text.Small>
            </Button>
          </div>

          <Button
            onPress={() => setType(type === "brush" ? "eraser" : "brush")}
            variant="primary"
            className={clsx("self-start", { "bg-blue-500": type === "eraser" })}
          >
            <Text.Small className="text-white dark:text-black">
              Eraser
            </Text.Small>
          </Button>
          <Button
            onPress={handleAddLayer}
            variant="primary"
            className="self-start"
          >
            <Text.Small className="text-white dark:text-black">
              Add Layer
            </Text.Small>
          </Button>
        </div>
        <div>
          {layers.map((_, index) => (
            <div
              key={index}
              className={clsx("flex flex-row border-t-[1px] border-black", {
                "bg-blue-300": index === activeLayerIndex,
              })}
            >
              <Button
                variant="unstyled"
                key={index}
                onPress={() => setActiveLayerIndex(index)}
                className="w-full px-4"
              >
                <Text.Small>Layer {index + 1}</Text.Small>
              </Button>
              <Button
                variant="unstyled"
                onPress={() => handleRemoveLayer(index)}
                isDisabled={layers.length === 1}
                className="self-start border-l-[1px] border-black p-2"
              >
                <Text.Small className="px-2">X</Text.Small>
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Stage
        className={clsx("cursor-none", {
          "border-2 border-dashed border-red-500": debugMode,
        })}
        width={window.innerWidth}
        scale={{ x: 1 / zoom, y: 1 / zoom }}
        height={window.innerHeight}
        // onPointerDown={handlePointerDown}
        // onPointerMove={(e) => {
        //   handleCursor(e);
        //   handlePointerMove(e);
        // }}
        // onPointerUp={handlePointerUp}
        onMouseDown={handlePointerDown}
        onMouseMove={(e) => {
          handleCursor(e);
          handlePointerMove(e);
        }}
        onMouseLeave={() => {
          setCursor(null);
          isDrawing.current = false;
        }}
        onMouseUp={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        ref={stageRef}
      >
        {layers.map(({ lines }, index) => (
          <Layer key={index}>
            {lines.map((line, i) => {
              const { points, color, size, opacity, type } = line;
              if (!line.softness) {
                const smoothedPoints = smoothPoints(points);
                return (
                  <Line
                    key={i}
                    ref={lineRef}
                    points={smoothedPoints}
                    stroke={color}
                    strokeWidth={size}
                    opacity={opacity}
                    tension={1}
                    globalCompositeOperation={
                      type === "eraser" ? "destination-out" : "source-over"
                    }
                    lineCap="round"
                    lineJoin="round"
                  />
                );
              }
              if (line.softness)
                return <LineWithSoftEdges key={i} line={line} />;
            })}
          </Layer>
        ))}

        <Layer>
          {!!cursor && (
            <Circle
              x={cursor.x}
              y={cursor.y}
              radius={size / 2}
              stroke={"#000000"}
              strokeWidth={1}
              fill={size < 10 ? "black" : undefined}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default DrawingCanvas;

// const LineWithSoftEdges = ({ line }: { line: TLine }) => {
//   const { points, size, softness, color, type } = line;

//   return (
//     <>
//       {points.map((point, i) => {
//         if (i % 2 !== 0) return null; // Skip non-paired points

//         const x = points[i];
//         const y = points[i + 1];
//         const gradientRadius = size * softness;

//         return (
//           <Shape
//             key={i}
//             x={x - gradientRadius}
//             y={y - gradientRadius}
//             globalCompositeOperation={
//               type === "eraser" ? "destination-out" : "source-over"
//             }
//             sceneFunc={(ctx) => {
//               const gradient = ctx.createRadialGradient(
//                 gradientRadius,
//                 gradientRadius,
//                 0, // Inner radius
//                 gradientRadius,
//                 gradientRadius,
//                 gradientRadius / 1, // Outer radius
//               );

//               gradient.addColorStop(0, color);
//               gradient.addColorStop(1, `${color}00`);

//               ctx.beginPath();
//               ctx.arc(
//                 gradientRadius,
//                 gradientRadius,
//                 gradientRadius,
//                 0,
//                 Math.PI * 2,
//                 false,
//               );
//               ctx.closePath();

//               ctx.fillStyle = gradient;
//               ctx.fill();
//             }}
//           />
//         );
//       })}
//     </>
//   );
// };

const LineWithSoftEdges = ({ line }: { line: TLine }) => {
  const { points, size, softness, opacity, type } = line;

  return (
    <>
      {points.map((_, i) => {
        if (i % 2 !== 0) return null; // Skip non-paired points

        const x = points[i];
        const y = points[i + 1];

        // The gradient should extend beyond the visible brush size
        const gradientRadius = size + size * softness;

        return (
          <Shape
            key={i}
            x={x - gradientRadius}
            y={y - gradientRadius}
            width={gradientRadius / 2}
            height={gradientRadius / 2}
            opacity={opacity}
            globalCompositeOperation={
              type === "eraser" ? "destination-out" : "source-over"
            }
            sceneFunc={(ctx) => {
              const gradient = ctx.createRadialGradient(
                gradientRadius,
                gradientRadius,
                size, // Start fading after the solid brush size
                gradientRadius,
                gradientRadius,
                gradientRadius, // Fade completely by this size
              );

              // Solid center, fading edges
              gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
              gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

              ctx.beginPath();
              ctx.arc(
                gradientRadius,
                gradientRadius,
                gradientRadius,
                0,
                Math.PI * 2,
                false,
              );
              ctx.closePath();

              ctx.fillStyle = gradient;
              ctx.fill();
            }}
            listening={false} // Improves performance by making it non-interactive
          />
        );
      })}
    </>
  );
};
