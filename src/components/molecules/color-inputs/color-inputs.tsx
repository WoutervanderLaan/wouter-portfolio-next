"use client";

import { useState, useCallback, useEffect } from "react";
import {
    hexToRgb,
    rgbToHex,
    isValidHex,
    normalizeHex,
    clamp,
} from "@/utils/color-utils";

interface ColorInputsProps {
    color: string;
    onChange: (color: string) => void;
}

const ColorInputs = ({ color, onChange }: ColorInputsProps) => {
    const [hexValue, setHexValue] = useState(color);
    const [rgbValues, setRgbValues] = useState({ r: 0, g: 0, b: 0 });
    const [activeInput, setActiveInput] = useState<string | null>(null);

    useEffect(() => {
        if (activeInput) return;

        setHexValue(color);
        const rgb = hexToRgb(color);
        if (rgb) {
            setRgbValues(rgb);
        }
    }, [color, activeInput]);

    const handleHexChange = useCallback(
        (value: string) => {
            setHexValue(value);

            if (isValidHex(value)) {
                const normalized = normalizeHex(value);
                onChange(normalized);
            }
        },
        [onChange],
    );

    const handleRgbChange = useCallback(
        (component: "r" | "g" | "b", value: string) => {
            const numValue = parseInt(value) || 0;
            const clampedValue = clamp(numValue, 0, 255);

            const newRgb = { ...rgbValues, [component]: clampedValue };
            setRgbValues(newRgb);

            const hexColor = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
            onChange(hexColor);
        },
        [rgbValues, onChange],
    );

    const handleFocus = useCallback((inputName: string) => {
        setActiveInput(inputName);
    }, []);

    const handleBlur = useCallback(() => {
        setActiveInput(null);

        if (isValidHex(hexValue)) {
            setHexValue(normalizeHex(hexValue));
        } else {
            setHexValue(color);
        }
    }, [hexValue, color]);

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <label className="font-medium min-w-[30px] text-sm text-black dark:text-white">
                    HEX
                </label>
                <input
                    type="text"
                    value={hexValue}
                    onChange={(e) => handleHexChange(e.target.value)}
                    onFocus={() => handleFocus("hex")}
                    onBlur={handleBlur}
                    className="flex-1 rounded border border-black bg-white px-2 py-1 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-white dark:bg-black dark:text-white"
                    placeholder="#000000"
                />
            </div>

            <div className="flex items-center gap-2">
                <label className="font-medium min-w-[30px] text-sm text-black dark:text-white">
                    RGB
                </label>
                <div className="flex flex-1 gap-1">
                    <input
                        type="number"
                        min="0"
                        max="255"
                        value={rgbValues.r}
                        onChange={(e) => handleRgbChange("r", e.target.value)}
                        onFocus={() => handleFocus("r")}
                        onBlur={handleBlur}
                        className="w-full rounded border border-black bg-white px-2 py-1 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-white dark:bg-black dark:text-white"
                        placeholder="R"
                    />
                    <input
                        type="number"
                        min="0"
                        max="255"
                        value={rgbValues.g}
                        onChange={(e) => handleRgbChange("g", e.target.value)}
                        onFocus={() => handleFocus("g")}
                        onBlur={handleBlur}
                        className="w-full rounded border border-black bg-white px-2 py-1 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-white dark:bg-black dark:text-white"
                        placeholder="G"
                    />
                    <input
                        type="number"
                        min="0"
                        max="255"
                        value={rgbValues.b}
                        onChange={(e) => handleRgbChange("b", e.target.value)}
                        onFocus={() => handleFocus("b")}
                        onBlur={handleBlur}
                        className="w-full rounded border border-black bg-white px-2 py-1 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-white dark:bg-black dark:text-white"
                        placeholder="B"
                    />
                </div>
            </div>
        </div>
    );
};

export default ColorInputs;
