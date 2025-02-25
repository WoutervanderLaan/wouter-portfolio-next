import { Circle } from "react-konva";

type CursorProps = {
  size: number;
  position: { x: number; y: number };
};

const Cursor = ({ size, position }: CursorProps) => (
  <Circle
    {...position}
    radius={size / 2}
    stroke={"#000000"}
    strokeWidth={1}
    fill={size < 10 ? "black" : undefined}
  />
);

export default Cursor;
