"use client";

import clsx from "clsx";
import Image from "next/image";
import { PortfolioImageProps, Size } from "./portfolio.types";
import { useState } from "react";

const variantStyles: Record<Size, string> = {
  small: "h-20",
  default: "h-40",
  large: "h-80",
  xl: "h-[500px]",
};

const PortfolioImage = ({
  size = "default",
  src,
  alt,
}: PortfolioImageProps) => {
  const [width, setWidth] = useState(160);

  return (
    <div style={{ width }} className={clsx("relative", variantStyles[size])}>
      <Image
        onLoad={(e) => setWidth(e.currentTarget.width)}
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 100%) 160px"
        draggable="false"
        className="min-w-max object-contain"
      />
    </div>
  );
};

export default PortfolioImage;
