import clsx from "clsx";
import { SVGAttributes } from "react";

type IconProps = {
    size?: number;
    strokeWidth?: number;
    className?: SVGAttributes<SVGSVGElement>["className"];
};

const Cross = ({ size = 32, strokeWidth = 3, className }: IconProps) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={clsx("stroke-black", className)}
    >
        <path
            d="M1.5 2L30 30.5M1.5 30.5L30 2"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
        />
    </svg>
);

export default Cross;
