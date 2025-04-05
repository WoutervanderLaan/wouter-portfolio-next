import { ToolType } from "./tool-type";

export type TPoint = { x: number; y: number };

export type TLine = {
  points: number[];
  color: string;
  size: number;
  opacity: number;
  type: Omit<ToolType, `${ToolType.DRAG} ${ToolType.ZOOM}`>;
  timeStamp: number;
};
