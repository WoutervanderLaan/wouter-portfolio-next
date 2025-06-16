import { TLine } from "@/lib/types/line";
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

export const generateSvg = (
    lines: TLine[],
    erasers: TLine[],
    width: number,
    height: number,
): string => {
    const svgLines = lines
        .map((line) => {
            const d = `M ${line.points[0]} ${line.points[1]} ${line.points
                .slice(2)
                .map((p, i) => (i % 2 ? p : `L ${p}`))
                .join(" ")}`;
            return `<path d="${d}" stroke="${line.color}" stroke-width="${line.size}" fill="none" />`;
        })
        .join("\n");

    const eraserPaths = erasers
        .map((line) => {
            const d = `M ${line.points[0]} ${line.points[1]} ${line.points
                .slice(2)
                .map((p, i) => (i % 2 ? p : `L ${p}`))
                .join(" ")}`;
            return `<path d="${d}" stroke="black" stroke-width="${line.size}" fill="none" stroke-linecap="round" stroke-linejoin="round" />`;
        })
        .join("\n");

    return `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <mask id="eraserMask">
      <rect x="0" y="0" width="${width}" height="${height}" fill="white"/>
      ${eraserPaths}
    </mask>
  </defs>
  <g mask="url(#eraserMask)">
    ${svgLines}
  </g>
</svg>`;
};

export const calculateBoundingBox = (lines: Array<TLine>, padding = 10) => {
    let minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;

    lines.forEach(({ points }) => {
        for (let i = 0; i < points.length; i += 2) {
            const x = points[i];
            const y = points[i + 1];
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
        }
    });

    minX -= padding;
    minY -= padding;
    maxX += padding;
    maxY += padding;

    const width = maxX - minX;
    const height = maxY - minY;

    return { width, height, minX, minY, maxX, maxY };
};
