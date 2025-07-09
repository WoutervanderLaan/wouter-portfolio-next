"use client";

import ColorPicker from "@/components/molecules/color-picker/color-picker";
import DrawingButtons from "@/components/molecules/drawing-buttons/drawing-buttons";
import Sidebar from "../../molecules/sidebar/sidebar";
import Tooltip from "@/components/molecules/tooltip/tooltip";
import { MAX_COLOR_HISTORY } from "@/store/slices/canvas-slice";
import useCanvasStore from "@/hooks/store-hooks/use-canvas-store";

const DrawingSettings = () => {
    const { color, setColor, colorHistory } = useCanvasStore();

    return (
        <Sidebar className="h-full">
            <div className="flex flex-col gap-2 p-2">
                <div className="flex w-fit flex-col gap-1">
                    <Tooltip tooltipText="Color picker">
                        <ColorPicker color={color} setColor={setColor} />
                    </Tooltip>

                    <div className="grid grid-cols-2 gap-1">
                        {Array.from({ length: MAX_COLOR_HISTORY }).map(
                            (_, i) => (
                                <DrawingButtons.PrevColor
                                    key={`${colorHistory[i]}_${i}`}
                                    setColor={setColor}
                                    color={colorHistory[i]}
                                />
                            ),
                        )}
                    </div>
                </div>
                <Tooltip tooltipText="Size">
                    <DrawingButtons.Size />
                </Tooltip>

                <Tooltip tooltipText="Opacity">
                    <DrawingButtons.Opacity />
                </Tooltip>

                <Tooltip tooltipText="Brush">
                    <DrawingButtons.Paint />
                </Tooltip>

                <Tooltip tooltipText="Eraser">
                    <DrawingButtons.Eraser />
                </Tooltip>

                <Tooltip tooltipText="Zoom">
                    <DrawingButtons.Zoom />
                </Tooltip>

                <Tooltip tooltipText="Move">
                    <DrawingButtons.Drag />
                </Tooltip>

                <Tooltip tooltipText="Undo">
                    <DrawingButtons.Undo />
                </Tooltip>

                <Tooltip tooltipText="Redo">
                    <DrawingButtons.Redo />
                </Tooltip>

                <Tooltip tooltipText="Clear">
                    <DrawingButtons.Clear />
                </Tooltip>

                <Tooltip tooltipText="Save">
                    <DrawingButtons.Save />
                </Tooltip>
            </div>
        </Sidebar>
    );
};

export default DrawingSettings;
