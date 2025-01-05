import { StaticImageData } from "next/image";

export type TImage = {
  src: StaticImageData | string;
  alt: string;
};

export type Size = "small" | "default" | "large" | "xl";
