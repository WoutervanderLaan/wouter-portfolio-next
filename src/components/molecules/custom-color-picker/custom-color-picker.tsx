"use client";

import { useState, useCallback, useEffect } from "react";
import ColorField from "../color-field/color-field";
import HueSlider from "../hue-slider/hue-slider";
import ColorInputs from "../color-inputs/color-inputs";
import { hexToHsv, hsvToHex, hexToRgb, HSVColor } from "@/utils/color-utils";

interface CustomColorPickerProps {
    color: string; // hex format
    onChange: (color: string) => void;
    onClose?: () => void;
}

const CustomColorPicker = ({
    color,
    onChange,
    onClose,
}: CustomColorPickerProps) => {
    const [hsv, setHsv] = useState<HSVColor>({ h: 0, s: 0, v: 0 });
    const [currentColor, setCurrentColor] = useState(color);

    useEffect(() => {
        const hsvColor = hexToHsv(color);
        if (hsvColor) {
            setHsv(hsvColor);
        }
        setCurrentColor(color);
    }, [color]);

    const handleHueChange = useCallback(
        (newHue: number) => {
            const newHsv = { ...hsv, h: newHue };
            setHsv(newHsv);

            const newColor = hsvToHex(newHsv.h, newHsv.s, newHsv.v);
            setCurrentColor(newColor);
            onChange(newColor);
        },
        [hsv, onChange],
    );

    const handleFieldChange = useCallback(
        (saturation: number, lightness: number) => {
            const newHsv = { ...hsv, s: saturation, v: lightness };
            setHsv(newHsv);

            const newColor = hsvToHex(newHsv.h, newHsv.s, newHsv.v);
            setCurrentColor(newColor);
            onChange(newColor);
        },
        [hsv, onChange],
    );

    const handleColorInputChange = useCallback(
        (newColor: string) => {
            const hsvColor = hexToHsv(newColor);
            if (hsvColor) {
                setHsv(hsvColor);
            }
            setCurrentColor(newColor);
            onChange(newColor);
        },
        [onChange],
    );

    const rgb = hexToRgb(currentColor);
    const rgbDisplay = rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : currentColor;

    return (
        <div className="rounded-md border border-black bg-white p-4 shadow-lg dark:border-white dark:bg-black">
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                    <div
                        className="h-12 w-12 rounded border border-black dark:border-white"
                        style={{ backgroundColor: currentColor }}
                    />
                    <div className="flex-1">
                        <div className="font-medium text-sm text-black dark:text-white">
                            Current Color
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                            {currentColor}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                            {rgbDisplay}
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <ColorField
                        hue={hsv.h}
                        saturation={hsv.s}
                        lightness={hsv.v}
                        onChange={handleFieldChange}
                        size={200}
                    />
                    <HueSlider
                        hue={hsv.h}
                        onChange={handleHueChange}
                        width={20}
                        height={200}
                        orientation="vertical"
                    />
                </div>

                <ColorInputs
                    color={currentColor}
                    onChange={handleColorInputChange}
                />

                {onClose && (
                    <button
                        onClick={onClose}
                        className="mt-2 rounded-md bg-black px-4 py-2 text-white transition-opacity hover:opacity-80 dark:bg-white dark:text-black"
                    >
                        Done
                    </button>
                )}
            </div>
        </div>
    );
};

export default CustomColorPicker;
