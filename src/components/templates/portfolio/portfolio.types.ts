import { StaticImageData } from "next/image";

export type TImage = {
  src: StaticImageData | string;
  alt: string;
};

export type TVideo = {
  src: string;
  alt: string;
};

export type Size = "extraSmall" | "small" | "default" | "large" | "xl";
