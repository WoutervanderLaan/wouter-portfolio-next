import { StaticImageData } from "next/image";

export type TPortfolioSeriesInfo = {
  title: string;
  material: string;
  dimensions?: string;
  description: string;
  year: string;
};

export type TImage = {
  src: StaticImageData | string;
  alt: string;
};

export type Size = "small" | "default" | "large" | "xl";

export type PortfolioThumbnailsProps = {
  images: Array<TImage>;
  size?: Exclude<Size, "large" | "xl">;
};

export type PortfolioImageProps = {
  size?: Size;
} & TImage;
