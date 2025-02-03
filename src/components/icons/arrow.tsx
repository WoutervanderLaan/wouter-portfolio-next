type ArrowProps = {
  width?: number;
  height?: number;
  direction?: "left" | "right" | "up" | "down";
  color?: string;
};

type Directions = "left" | "right" | "up" | "down";

const directions: Record<Directions, number> = {
  left: 0,
  up: 90,
  right: 180,
  down: 270,
};

const Arrow = ({
  width = 13,
  height = 6,
  direction = "left",
  color = "black",
}: ArrowProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 13 6"
    fill="none"
    transform={`rotate(${directions[direction]})`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 3L5 5.88675V0.113249L0 3ZM13 2.5H4.5V3.5H13V2.5Z"
      fill={color}
    />
  </svg>
);

export default Arrow;
