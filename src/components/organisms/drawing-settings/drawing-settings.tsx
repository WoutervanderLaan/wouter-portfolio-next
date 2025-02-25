import ColorPicker from "@/components/molecules/color-picker/color-picker";
import DrawingButtons from "@/components/molecules/drawing-buttons/drawing-buttons";
import { MAX_COLOR_HISTORY } from "@/hooks/use-brush-settings";
import { useDrawingContext } from "@/hooks/use-drawing-context";
import { Stage as StageKonva } from "konva/lib/Stage";
import { RefObject } from "react";
import Sidebar from "../sidebar/sidebar";
import Layers from "@/components/molecules/layers/layers";

type DrawingSettingsProps = {
  stageRef: RefObject<StageKonva | null>;
};

const DrawingSettings = ({ stageRef }: DrawingSettingsProps) => {
  const { color, adjustColor, colorHistory } = useDrawingContext();

  const saveCanvas = () => {
    const uri = stageRef.current?.toDataURL();
    if (!uri) return;
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = uri;
    link.click();
  };

  return (
    <Sidebar>
      <div className="flex flex-col gap-2 p-2">
        <div className="flex w-fit flex-col gap-1">
          <ColorPicker color={color} setColor={adjustColor} />

          <div className="grid grid-cols-2 gap-1">
            {Array.from({ length: MAX_COLOR_HISTORY }).map((_, i) => (
              <DrawingButtons.PrevColor
                key={`${colorHistory[i]}_${i}`}
                setColor={adjustColor}
                color={colorHistory[i]}
              />
            ))}
          </div>
        </div>

        <DrawingButtons.Size />

        <DrawingButtons.Opacity />

        <DrawingButtons.Paint />

        <DrawingButtons.Eraser />

        <DrawingButtons.ZoomIn />

        <DrawingButtons.ZoomOut />

        <DrawingButtons.Drag />

        <DrawingButtons.Undo />

        <DrawingButtons.Redo />

        <DrawingButtons.Clear />

        <DrawingButtons.Save save={saveCanvas} />

        <DrawingButtons.AddLayer />
      </div>
      <Layers />
    </Sidebar>
  );
};

export default DrawingSettings;
