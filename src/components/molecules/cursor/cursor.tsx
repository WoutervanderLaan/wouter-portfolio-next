import useCanvasStore from "@/hooks/store-hooks/use-canvas-store";
import { Circle } from "react-konva";

type CursorProps = {
    position: { x: number; y: number };
};

const Cursor = ({ position }: CursorProps) => {
    const { size } = useCanvasStore();

    return (
        <Circle
            {...position}
            radius={size / 2}
            stroke={"#000000"}
            strokeWidth={1}
            fill={size < 10 ? "black" : undefined}
        />
    );
};

export default Cursor;
