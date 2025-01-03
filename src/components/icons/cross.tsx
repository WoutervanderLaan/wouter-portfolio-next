import clsx from "clsx";

type IconProps = {
  width?: number;
  height?: number;
  className?: string;
};

const Cross = ({ width = 32, height = 32, className }: IconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={clsx("stroke-black", className)}
  >
    <path
      d="M1.5 2L30 30.5M1.5 30.5L30 2"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

export default Cross;
