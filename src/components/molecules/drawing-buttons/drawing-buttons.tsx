import Button from "@/components/atoms/button/button";
import Eraser from "@/components/icons/eraser";
import Paint from "@/components/icons/paint";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Slider from "../slider/slider";
import { ToolType } from "@/lib/types/tool-type";
import ModalTrigger from "../modal-trigger/modal-trigger";
import ZoomIn from "@/components/icons/zoom-in";
import ZoomOut from "@/components/icons/zoom-out";
import Move from "@/components/icons/move";
import Download from "@/components/icons/download";
import Layer from "@/components/icons/layer";
import Bin from "@/components/icons/bin";
import Undo from "@/components/icons/undo";
import Redo from "@/components/icons/redo";
import Opacity from "@/components/icons/opacity";
import Diameter from "@/components/icons/diameter";
import useSaveCanvas from "@/hooks/use-save-canvas";
import ResponsiveContainer from "@/components/atoms/responsive-container/responsive-container";
import Text from "@/components/atoms/text/text";
import { Zoom } from "@/store/slices/canvas-slice";
import useHistory from "@/hooks/use-history";
import useCanvasStore from "@/hooks/store-hooks/use-canvas-store";
import useSession from "@/hooks/use-session";

const STANDARD_BUTTON_STYLING =
    "h-9 flex aspect-square items-center justify-center self-start overflow-hidden";

const PaintButton = () => {
    const { type, setType } = useCanvasStore();

    return (
        <Button
            onPress={() => setType(ToolType.BRUSH)}
            variant="secondary"
            className={clsx(STANDARD_BUTTON_STYLING, {
                "ring-2 ring-blue-400 ring-offset-2": type === ToolType.BRUSH,
            })}
        >
            <Paint />
        </Button>
    );
};

const EraserButton = () => {
    const { type, setType } = useCanvasStore();

    return (
        <Button
            onPress={() => setType(ToolType.ERASER)}
            variant="secondary"
            className={clsx(STANDARD_BUTTON_STYLING, {
                "ring-2 ring-blue-400 ring-offset-2": type === ToolType.ERASER,
            })}
        >
            <Eraser />
        </Button>
    );
};

const SizeButton = () => {
    const [isSliderOpen, setIsSliderOpen] = useState(false);
    const { size, setSize } = useCanvasStore();

    return (
        <ResponsiveContainer
            className="relative w-fit"
            isActive={isSliderOpen}
            callback={() => setIsSliderOpen(false)}
        >
            <Button
                onPress={() => setIsSliderOpen((prev) => !prev)}
                variant="secondary"
                className={clsx(STANDARD_BUTTON_STYLING, {
                    "rounded-r-none border-r-0": isSliderOpen,
                })}
            >
                <Diameter />
            </Button>
            {isSliderOpen && (
                <div className="absolute right-0 top-0 flex h-9 min-w-40 translate-x-[100%] items-center justify-center border border-l-0 border-black bg-white">
                    <Slider
                        ariaLabel="size-slider"
                        showNumericValue
                        value={size}
                        max={200}
                        onChange={(e) => setSize(parseInt(e.target.value))}
                    />
                </div>
            )}
        </ResponsiveContainer>
    );
};

const OpacityButton = ({}) => {
    const [isSliderOpen, setIsSliderOpen] = useState(false);
    const { opacity, setOpacity } = useCanvasStore();

    return (
        <ResponsiveContainer
            className="relative w-fit"
            isActive={isSliderOpen}
            callback={() => setIsSliderOpen(false)}
        >
            <Button
                onPress={() => setIsSliderOpen((prev) => !prev)}
                variant="secondary"
                className={clsx(STANDARD_BUTTON_STYLING, {
                    "rounded-r-none border-r-0": isSliderOpen,
                })}
            >
                <Opacity />
            </Button>
            {isSliderOpen && (
                <div className="absolute right-0 top-0 flex h-9 min-w-40 translate-x-[100%] items-center justify-center border border-l-0 border-black bg-white">
                    <Slider
                        ariaLabel="opacity-slider"
                        showNumericValue
                        value={opacity}
                        max={100}
                        onChange={(e) => setOpacity(parseInt(e.target.value))}
                    />
                </div>
            )}
        </ResponsiveContainer>
    );
};

const UndoButton = () => {
    const { undo, noHistory } = useHistory();

    return (
        <Button
            onPress={undo}
            variant="secondary"
            className={clsx(STANDARD_BUTTON_STYLING)}
            isDisabled={noHistory}
        >
            <Undo />
        </Button>
    );
};

const RedoButton = () => {
    const { redo, redoStack } = useHistory();

    return (
        <Button
            onPress={redo}
            variant="secondary"
            isDisabled={!redoStack.length}
            className={clsx(STANDARD_BUTTON_STYLING)}
        >
            <Redo />
        </Button>
    );
};

const ZoomButton = () => {
    const { setType, type, setZoomType, zoomType } = useCanvasStore();

    useEffect(() => {
        if (type !== ToolType.ZOOM) setZoomType(Zoom.IN);
    }, [type]);

    return (
        <Button
            onPress={() => {
                setZoomType(
                    zoomType === Zoom.IN && type === ToolType.ZOOM
                        ? Zoom.OUT
                        : Zoom.IN,
                );
                setType(ToolType.ZOOM);
            }}
            variant="secondary"
            className={clsx(STANDARD_BUTTON_STYLING, {
                "ring-2 ring-blue-400 ring-offset-2": type === ToolType.ZOOM,
            })}
        >
            {zoomType === Zoom.IN ? <ZoomIn /> : <ZoomOut />}
        </Button>
    );
};

const DragButton = () => {
    const { setType, type } = useCanvasStore();

    return (
        <Button
            onPress={() => setType(ToolType.DRAG)}
            variant="secondary"
            className={clsx(STANDARD_BUTTON_STYLING, {
                "ring-2 ring-blue-400 ring-offset-2": type === ToolType.DRAG,
            })}
        >
            <Move />
        </Button>
    );
};

const ClearButton = () => {
    const { resetHistory, resetLayers } = useCanvasStore();
    const { noHistory } = useHistory();
    const session = useSession();

    const clearCanvas = async () => {
        resetLayers();
        resetHistory();
        await session.reset();
    };

    return (
        <Button
            onPress={clearCanvas}
            variant="secondary"
            isDisabled={noHistory || session.isLoading}
            className={clsx(STANDARD_BUTTON_STYLING)}
        >
            <Bin />
        </Button>
    );
};

const SaveButton = () => {
    const { noHistory } = useHistory();
    const saveCanvas = useSaveCanvas();

    return (
        <ModalTrigger
            isDisabled={noHistory}
            isDismissable
            className={clsx(
                STANDARD_BUTTON_STYLING,
                "rounded-md border border-black",
            )}
            modalContent={
                <div className="flex w-40 flex-col gap-4 rounded-md border border-black bg-white p-4">
                    <Text.Paragraph>Save as:</Text.Paragraph>
                    <Button variant="primary" onPress={() => saveCanvas("png")}>
                        <Text.Paragraph className="text-white">
                            png
                        </Text.Paragraph>
                    </Button>

                    <Button
                        variant="primary"
                        onPress={() => saveCanvas("svg")}
                        isDisabled
                        className="w-full"
                    >
                        <Text.Paragraph className="text-white">
                            svg
                        </Text.Paragraph>
                    </Button>
                </div>
            }
        >
            <Download />
        </ModalTrigger>
    );
};

type PrevColorButtonProps = {
    setColor: (color: string) => void;
    color: string;
};

const PrevColorButton = ({ setColor, color }: PrevColorButtonProps) => (
    <Button
        onPress={() => setColor(color)}
        variant="unstyled"
        isDisabled={!color}
    >
        <div
            className="flex aspect-square flex-1 border border-black"
            style={{ backgroundColor: color || "transparent" }}
        />
    </Button>
);

const AddLayerButton = () => {
    const { addLayer } = useCanvasStore();

    return (
        <Button
            onPress={addLayer}
            variant="secondary"
            className={clsx(STANDARD_BUTTON_STYLING)}
        >
            <Layer />
        </Button>
    );
};

const DrawingButtons = {
    Paint: PaintButton,
    Eraser: EraserButton,
    Size: SizeButton,
    Opacity: OpacityButton,
    Zoom: ZoomButton,
    Drag: DragButton,
    Undo: UndoButton,
    Redo: RedoButton,
    Clear: ClearButton,
    Save: SaveButton,
    PrevColor: PrevColorButton,
    AddLayer: AddLayerButton,
};

export default DrawingButtons;
