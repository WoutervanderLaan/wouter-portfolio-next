"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { clamp } from "@/utils/color-utils";

interface HueSliderProps {
    hue: number; // 0-360
    onChange: (hue: number) => void;
    width?: number;
    height?: number;
    orientation?: "horizontal" | "vertical";
}

const HueSlider = ({
    hue,
    onChange,
    width = 200,
    height = 20,
    orientation = "horizontal",
}: HueSliderProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, width, height);

        const gradient =
            orientation === "horizontal"
                ? ctx.createLinearGradient(0, 0, width, 0)
                : ctx.createLinearGradient(0, 0, 0, height);

        const steps = 7;
        for (let i = 0; i < steps; i++) {
            const hueValue = (i / (steps - 1)) * 360;
            const stop = i / (steps - 1);

            const c = 1;
            const x = c * (1 - Math.abs(((hueValue / 60) % 2) - 1));
            const m = 0;

            let r = 0,
                g = 0,
                b = 0;
            if (hueValue >= 0 && hueValue < 60) {
                r = c;
                g = x;
                b = 0;
            } else if (hueValue >= 60 && hueValue < 120) {
                r = x;
                g = c;
                b = 0;
            } else if (hueValue >= 120 && hueValue < 180) {
                r = 0;
                g = c;
                b = x;
            } else if (hueValue >= 180 && hueValue < 240) {
                r = 0;
                g = x;
                b = c;
            } else if (hueValue >= 240 && hueValue < 300) {
                r = x;
                g = 0;
                b = c;
            } else if (hueValue >= 300 && hueValue < 360) {
                r = c;
                g = 0;
                b = x;
            }

            const rgb = `rgb(${Math.round((r + m) * 255)}, ${Math.round((g + m) * 255)}, ${Math.round((b + m) * 255)})`;
            gradient.addColorStop(stop, rgb);
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
    }, [width, height, orientation]);

    const handleInteraction = useCallback(
        (event: React.MouseEvent | React.TouchEvent) => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
            const clientX =
                "touches" in event ? event.touches[0].clientX : event.clientX;
            const clientY =
                "touches" in event ? event.touches[0].clientY : event.clientY;

            let newHue: number;
            if (orientation === "horizontal") {
                const x = clientX - rect.left;
                const percentage = clamp(x / width, 0, 1);
                newHue = percentage * 360;
            } else {
                const y = clientY - rect.top;
                const percentage = clamp(y / height, 0, 1);
                newHue = percentage * 360;
            }

            onChange(Math.round(newHue));
        },
        [width, height, onChange, orientation],
    );

    const handleMouseDown = useCallback(
        (event: React.MouseEvent) => {
            setIsDragging(true);
            handleInteraction(event);
        },
        [handleInteraction],
    );

    const handleMouseMove = useCallback(
        (event: React.MouseEvent) => {
            if (isDragging) {
                handleInteraction(event);
            }
        },
        [isDragging, handleInteraction],
    );

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleTouchStart = useCallback(
        (event: React.TouchEvent) => {
            event.preventDefault();
            setIsDragging(true);
            handleInteraction(event);
        },
        [handleInteraction],
    );

    const handleTouchMove = useCallback(
        (event: React.TouchEvent) => {
            if (isDragging) {
                event.preventDefault();
                handleInteraction(event);
            }
        },
        [isDragging, handleInteraction],
    );

    const handleTouchEnd = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        const handleGlobalMouseUp = () => setIsDragging(false);

        if (isDragging) {
            document.addEventListener("mouseup", handleGlobalMouseUp);
            document.addEventListener("touchend", handleGlobalMouseUp);
        }

        return () => {
            document.removeEventListener("mouseup", handleGlobalMouseUp);
            document.removeEventListener("touchend", handleGlobalMouseUp);
        };
    }, [isDragging]);

    const sliderPosition =
        orientation === "horizontal"
            ? (hue / 360) * width
            : (hue / 360) * height;

    return (
        <div className="relative">
            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                className="cursor-pointer border border-black dark:border-white"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            />

            <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 transform"
                style={{
                    left:
                        orientation === "horizontal"
                            ? sliderPosition
                            : width / 2,
                    top:
                        orientation === "horizontal"
                            ? height / 2
                            : sliderPosition,
                }}
            >
                <div className="h-3 w-3 rounded-full border-2 border-white bg-white shadow-md" />
            </div>
        </div>
    );
};

export default HueSlider;
