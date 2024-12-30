"use client";

import clsx from "clsx";
import Image from "next/image";
import { PortfolioImageProps, Size } from "./portfolio.types";
import { useState } from "react";

const variantStyles: Record<Size, string> = {
  small: "h-20",
  default: "h-40",
  large: "h-80",
  xl: "h-4/6",
};

const PortfolioImage = ({
  size = "default",
  src,
  alt,
}: PortfolioImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      onLoad={() => setLoaded(true)}
      src={src}
      alt={alt}
      width={0}
      height={160}
      sizes="(max-width: 100%) 160px"
      draggable="false"
      className={clsx(
        "w-auto transition-all duration-75 bg-gray-300",
        { "animate-pulse": !loaded },
        variantStyles[size]
      )}
    />
  );
};

export default PortfolioImage;
