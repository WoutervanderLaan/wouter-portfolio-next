import useDrawingContext from "@/hooks/use-drawing-context";
import { Circle } from "react-konva";

type CursorProps = {
  position: { x: number; y: number };
};

const Cursor = ({ position }: CursorProps) => {
  const { size } = useDrawingContext();

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
