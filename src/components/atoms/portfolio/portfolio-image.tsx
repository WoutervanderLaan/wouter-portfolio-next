import clsx from "clsx";
import Image from "next/image";
import { PortfolioImageProps, Size } from "./portfolio.types";

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
}: PortfolioImageProps) => (
  <Image
    src={src}
    alt={alt}
    draggable="false"
    quality={size === "xl" ? 100 : 50}
    placeholder="blur"
    loading="eager"
    className={clsx("w-fit object-contain", variantStyles[size])}
  />
);

export default PortfolioImage;
