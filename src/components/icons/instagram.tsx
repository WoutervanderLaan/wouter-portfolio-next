import clsx from "clsx";
import { SVGAttributes } from "react";

type IconProps = {
    width?: number;
    height?: number;
    className?: SVGAttributes<SVGSVGElement>["className"];
};

const Instagram = ({ width = 47, height = 46, className }: IconProps) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 47 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={clsx("fill-black stroke-black", className)}
    >
        <path
            d="M2 34V12C2 6.47715 6.47715 2 12 2H35C40.5228 2 45 6.47715 45 12V34C45 39.5228 40.5228 44 35 44H12C6.47715 44 2 39.5228 2 34Z"
            strokeWidth="3"
            fill="none"
        />
        <circle cx="23.5" cy="22.5" r="9" strokeWidth="3" fill="none" />
        <circle cx="36" cy="10" r="3" />
    </svg>
);

export default Instagram;
