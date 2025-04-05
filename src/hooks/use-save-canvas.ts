import { exportStageSVG } from "react-konva-to-svg";
import useDrawingContext from "./use-drawing-context";

const useSaveCanvas = () => {
  const { stageRef } = useDrawingContext();

  const saveCanvas = async (format: "png" | "jpg" | "svg") => {
    if (!stageRef.current) return;

    let dataURL;

    if (format !== "svg") {
      dataURL = stageRef.current.toDataURL({
        mimeType: `image/${format}`,
        quality: 1,
        pixelRatio: 2,
      });
    } else {
      const svgString = await exportStageSVG(stageRef.current, false);
      const blob = new Blob([svgString], { type: "image/svg+xml" });
      dataURL = URL.createObjectURL(blob);
    }

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `drawing.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return saveCanvas;
};

export default useSaveCanvas;
