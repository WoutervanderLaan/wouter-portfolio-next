"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getHueColor, clamp } from "@/utils/color-utils";

interface ColorFieldProps {
    hue: number; // 0-360
    saturation: number; // 0-100
    lightness: number; // 0-100
    onChange: (saturation: number, lightness: number) => void;
    size?: number;
}

const ColorField = ({
    hue,
    saturation,
    lightness,
    onChange,
    size = 200,
}: ColorFieldProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, size, size);

        const saturationGradient = ctx.createLinearGradient(0, 0, size, 0);
        saturationGradient.addColorStop(0, "#ffffff");
        saturationGradient.addColorStop(1, getHueColor(hue));

        ctx.fillStyle = saturationGradient;
        ctx.fillRect(0, 0, size, size);

        const lightnessGradient = ctx.createLinearGradient(0, 0, 0, size);
        lightnessGradient.addColorStop(0, "rgba(0,0,0,0)");
        lightnessGradient.addColorStop(1, "#000000");

        ctx.fillStyle = lightnessGradient;
        ctx.fillRect(0, 0, size, size);
    }, [hue, size]);

    const handleInteraction = useCallback(
        (event: React.MouseEvent | React.TouchEvent) => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
            const clientX =
                "touches" in event ? event.touches[0].clientX : event.clientX;
            const clientY =
                "touches" in event ? event.touches[0].clientY : event.clientY;

            const x = clientX - rect.left;
            const y = clientY - rect.top;

            const newSaturation = clamp((x / size) * 100, 0, 100);
            const newLightness = clamp(100 - (y / size) * 100, 0, 100);

            onChange(newSaturation, newLightness);
        },
        [size, onChange],
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

    const cursorX = (saturation / 100) * size;
    const cursorY = ((100 - lightness) / 100) * size;

    return (
        <div className="relative">
            <canvas
                ref={canvasRef}
                width={size}
                height={size}
                className="cursor-crosshair border border-black dark:border-white"
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
                    left: cursorX,
                    top: cursorY,
                }}
            >
                <div className="h-3 w-3 rounded-full border-2 border-white shadow-md" />
            </div>
        </div>
    );
};

export default ColorField;
