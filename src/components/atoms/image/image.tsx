import clsx from "clsx";
import { Size, TImage } from "../../templates/portfolio/portfolio.types";
import NextImage, { ImageProps } from "next/image";

type PortfolioImageProps = {
  size?: Size;
} & TImage &
  ImageProps;

const variantStyles: Record<Size, string> = {
  extraSmall: "h-10",
  small: "h-20",
  default: "h-40",
  large: "h-80",
  xl: "h-[60vh]",
};

const Image = ({
  size = "default",
  src,
  alt,
  className,
  ...rest
}: PortfolioImageProps) => (
  <NextImage
    src={src}
    alt={alt}
    draggable="false"
    className={clsx("w-auto object-contain", variantStyles[size], className)}
    {...rest}
  />
);

export default Image;
