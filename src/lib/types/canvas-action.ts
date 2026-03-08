import { TLine } from "./line";
import { CanvasElement } from "@/utils/canvas-utils";

export type CanvasAction =
  | { actionType: "line"; line: TLine; layerIndex: number }
  | { actionType: "element"; element: CanvasElement };
