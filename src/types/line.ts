import { BrushType } from "./tool-type";

export type TPoint = { x: number; y: number };

export type TLine = {
  points: number[];
  color: string;
  size: number;
  opacity: number;
  type: BrushType;
  timeStamp: number;
};
