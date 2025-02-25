import Konva from "konva";

export const smoothPoints = (points: Array<number>, iterations = 2) => {
  for (let i = 0; i < iterations; i++) {
    const smoothed = [];
    for (let j = 0; j < points.length - 2; j += 2) {
      const x1 = points[j];
      const y1 = points[j + 1];
      const x2 = points[j + 2];
      const y2 = points[j + 3];

      // Generate Q and R points
      const qx = 0.75 * x1 + 0.25 * x2;
      const qy = 0.75 * y1 + 0.25 * y2;
      const rx = 0.25 * x1 + 0.75 * x2;
      const ry = 0.25 * y1 + 0.75 * y2;

      smoothed.push(qx, qy, rx, ry);
    }

    // Add the last point
    smoothed.push(points[points.length - 2], points[points.length - 1]);
    points = smoothed;
  }
  return points;
};

export const extractPoint = (
  e: Konva.KonvaEventObject<PointerEvent | TouchEvent | MouseEvent>,
) => {
  const stage = e.target?.getStage();
  if (!stage) {
    console.warn("Unable to determine Stage");
    return [];
  }

  const pointer = stage.getPointerPosition();

  if (!pointer) throw Error("Unable to extract point from Event");

  const scale = stage.scaleX();
  const stageX = stage.x();
  const stageY = stage.y();

  const adjustedX = (pointer.x - stageX) / scale;
  const adjustedY = (pointer.y - stageY) / scale;

  return [adjustedX, adjustedY];
};
