import Button from "@/components/atoms/button/button";
import Text from "@/components/atoms/text/text";
import Arrow from "@/components/icons/arrow";
import Eraser from "@/components/icons/eraser";
import Paint from "@/components/icons/paint";
import clsx from "clsx";
import { useState } from "react";
import Slider from "../slider/slider";
import { useDrawingContext } from "@/hooks/use-drawing-context";
import { Zoom } from "@/hooks/use-zoom";
import { ToolType } from "@/types/tool-type";

const STANDARD_BUTTON_STYLING =
  "h-10 flex aspect-square items-center justify-center self-start overflow-hidden";

const PaintButton = () => {
  const { type, setType } = useDrawingContext();

  return (
    <Button
      onPress={() => setType(ToolType.BRUSH)}
      variant="secondary"
      className={clsx(STANDARD_BUTTON_STYLING, {
        "bg-gray-300": type === ToolType.BRUSH,
      })}
    >
      <Paint />
    </Button>
  );
};

const EraserButton = () => {
  const { type, setType } = useDrawingContext();

  return (
    <Button
      onPress={() => setType(ToolType.ERASER)}
      variant="secondary"
      className={clsx(STANDARD_BUTTON_STYLING, {
        "bg-gray-300": type === ToolType.ERASER,
      })}
    >
      <Eraser />
    </Button>
  );
};

const SizeButton = ({}) => {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const { size, setSize } = useDrawingContext();

  return (
    <div className="relative w-fit">
      <Button
        onPress={() => setIsSliderOpen((prev) => !prev)}
        variant="secondary"
        className={clsx(STANDARD_BUTTON_STYLING, {
          "rounded-r-none border-r-0": isSliderOpen,
        })}
      >
        <Text.Small>Si</Text.Small>
      </Button>
      {isSliderOpen && (
        <div className="absolute right-0 top-0 flex h-10 min-w-40 translate-x-[100%] items-center justify-center border border-l-0 border-black bg-white">
          <Slider
            onBlur={() => setIsSliderOpen(false)}
            ariaLabel={"size-slider"}
            showNumericValue
            value={size}
            max={200}
            onChange={(e) => setSize(parseInt(e.target.value))}
          />
        </div>
      )}
    </div>
  );
};

const OpacityButton = ({}) => {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const { opacity, setOpacity } = useDrawingContext();

  return (
    <div className="relative w-fit">
      <Button
        onPress={() => setIsSliderOpen((prev) => !prev)}
        variant="secondary"
        className={clsx(STANDARD_BUTTON_STYLING, {
          "rounded-r-none border-r-0": isSliderOpen,
        })}
      >
        <Text.Small>Op</Text.Small>
      </Button>
      {isSliderOpen && (
        <div className="absolute right-0 top-0 flex h-10 min-w-40 translate-x-[100%] items-center justify-center border border-l-0 border-black bg-white">
          <Slider
            onBlur={() => setIsSliderOpen(false)}
            ariaLabel={"opacity-slider"}
            showNumericValue
            value={opacity}
            max={100}
            onChange={(e) => setOpacity(parseInt(e.target.value))}
          />
        </div>
      )}
    </div>
  );
};

const UndoButton = () => {
  const { undo, noHistory } = useDrawingContext();

  return (
    <Button
      onPress={undo}
      variant="secondary"
      className={clsx(STANDARD_BUTTON_STYLING)}
      isDisabled={noHistory}
    >
      <Arrow />
    </Button>
  );
};

const RedoButton = () => {
  const { redo, redoStack } = useDrawingContext();

  return (
    <Button
      onPress={redo}
      variant="secondary"
      isDisabled={!redoStack.length}
      className={clsx(STANDARD_BUTTON_STYLING)}
    >
      <Arrow direction="right" />
    </Button>
  );
};

const ZoomInButton = () => {
  const { setType, type, setZoomType, zoomType } = useDrawingContext();

  return (
    <Button
      onPress={() => {
        setZoomType(Zoom.IN);
        setType(ToolType.ZOOM);
      }}
      variant="secondary"
      className={clsx(STANDARD_BUTTON_STYLING, {
        "bg-gray-300": zoomType === Zoom.IN && type === ToolType.ZOOM,
      })}
    >
      ++
    </Button>
  );
};

const ZoomOutButton = () => {
  const { setType, type, setZoomType, zoomType } = useDrawingContext();

  return (
    <Button
      onPress={() => {
        setZoomType(Zoom.OUT);
        setType(ToolType.ZOOM);
      }}
      variant="secondary"
      className={clsx(STANDARD_BUTTON_STYLING, {
        "bg-gray-300": zoomType === Zoom.OUT && type === ToolType.ZOOM,
      })}
    >
      --
    </Button>
  );
};

const DragButton = () => {
  const { setType, type } = useDrawingContext();

  return (
    <Button
      onPress={() => setType(ToolType.DRAG)}
      variant="secondary"
      className={clsx(STANDARD_BUTTON_STYLING, {
        "bg-gray-300": type === ToolType.DRAG,
      })}
    >
      DR
    </Button>
  );
};

const ClearButton = () => {
  const { noHistory, resetHistory, resetLayers } = useDrawingContext();

  const clearCanvas = () => {
    resetLayers();
    resetHistory();
  };

  return (
    <Button
      onPress={clearCanvas}
      variant="secondary"
      isDisabled={noHistory}
      className={clsx(STANDARD_BUTTON_STYLING)}
    >
      <Text.Small className="text-black">CL</Text.Small>
    </Button>
  );
};

type SaveButtonProps = {
  save: () => void;
};

const SaveButton = ({ save }: SaveButtonProps) => {
  const { noHistory } = useDrawingContext();

  return (
    <Button
      onPress={save}
      variant="secondary"
      isDisabled={noHistory}
      className={clsx(STANDARD_BUTTON_STYLING)}
    >
      <Text.Small className="text-black">SA</Text.Small>
    </Button>
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
  const { addLayer } = useDrawingContext();

  return (
    <Button
      onPress={addLayer}
      variant="secondary"
      className={clsx(STANDARD_BUTTON_STYLING)}
    >
      <Text.Small>+</Text.Small>
    </Button>
  );
};

const DrawingButtons = {
  Paint: PaintButton,
  Eraser: EraserButton,
  Size: SizeButton,
  Opacity: OpacityButton,
  ZoomIn: ZoomInButton,
  ZoomOut: ZoomOutButton,
  Drag: DragButton,
  Undo: UndoButton,
  Redo: RedoButton,
  Clear: ClearButton,
  Save: SaveButton,
  PrevColor: PrevColorButton,
  AddLayer: AddLayerButton,
};

export default DrawingButtons;
