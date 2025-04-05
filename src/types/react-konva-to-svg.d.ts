declare module "react-konva-to-svg" {
  import { Stage, Layer } from "react-konva";

  interface Options {
    onAfter: ([stage, layer]: [Stage, Layer]) => void;
    onBefore: ([stage, layer]: [Stage, Layer]) => void;
  }

  export async function exportStageSVG(
    stage: Stage,
    blob: true,
    options?: Options,
  ): Promise<Blob>;

  export async function exportStageSVG(
    stage: Stage,
    blob: false,
    options?: Options,
  ): Promise<string>;
}
