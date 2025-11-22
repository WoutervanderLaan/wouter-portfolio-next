// import { exportStageSVG } from "react-konva-to-svg";
import { generateSvg } from "@/utils/drawing-helpers";
import { useStage } from "./use-stage";
import useCanvasStore from "./store-hooks/use-canvas-store";

const useSaveCanvas = () => {
    const { layers } = useCanvasStore();
    const { stageRef } = useStage();

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
            const lines = layers[0].lines;
            const eraserLines = layers[1].lines;

            const svgString = generateSvg(
                lines,
                eraserLines,
                stageRef.current.width(),
                stageRef.current.height(),
            );
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
