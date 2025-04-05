type ArrowProps = {
  size?: number;
  direction?: "left" | "right" | "up" | "down";
  color?: string;
};

type Directions = "left" | "right" | "up" | "down";

const directions: Record<Directions, number> = {
  left: 180,
  up: 90,
  right: 0,
  down: 270,
};

const Arrow = ({
  size = 24,
  direction = "left",
  color = "black",
}: ArrowProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    transform={`rotate(${directions[direction]})`}
    stroke={color}
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8L22 12L18 16" />
    <path d="M2 12H22" />
  </svg>
);

export default Arrow;
