import Button from "@/components/atoms/button/button";
import { useState } from "react";
import CustomColorPicker from "../custom-color-picker/custom-color-picker";
import ResponsiveContainer from "@/components/atoms/responsive-container/responsive-container";

type ColorPickerTriggerProps = {
    color: string;
    setColor: (color: string) => void;
    disabled?: boolean;
};

const ColorPickerTrigger = ({
    color,
    setColor,
    disabled,
}: ColorPickerTriggerProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <Button
                onPress={() => setIsOpen((prev) => !prev)}
                variant="unstyled"
                isDisabled={disabled}
                className="self-start"
            >
                <div
                    className="aspect-square h-9 border border-black dark:border-white"
                    style={{ backgroundColor: color }}
                />
            </Button>

            {isOpen && (
                <ResponsiveContainer
                    className="absolute left-12 top-0 z-10"
                    isActive={isOpen}
                    callback={() => setIsOpen(false)}
                >
                    <CustomColorPicker
                        color={color}
                        onChange={(newColor: string) => setColor(newColor)}
                        onClose={() => setIsOpen(false)}
                    />
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default ColorPickerTrigger;
