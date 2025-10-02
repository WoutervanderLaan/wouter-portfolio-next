export interface HSVColor {
    h: number; // 0-360
    s: number; // 0-100
    v: number; // 0-100
}

export interface RGBColor {
    r: number; // 0-255
    g: number; // 0-255
    b: number; // 0-255
}

// Convert HSV to RGB
export const hsvToRgb = (h: number, s: number, v: number): RGBColor => {
    const sNorm = s / 100;
    const vNorm = v / 100;
    const c = vNorm * sNorm;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = vNorm - c;

    let r = 0,
        g = 0,
        b = 0;

    if (h >= 0 && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (h >= 60 && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (h >= 120 && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (h >= 180 && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (h >= 240 && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else if (h >= 300 && h < 360) {
        r = c;
        g = 0;
        b = x;
    }

    return {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255),
    };
};

// Convert RGB to HSV
export const rgbToHsv = (r: number, g: number, b: number): HSVColor => {
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;

    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const diff = max - min;

    let h = 0;
    let s = 0;
    const v = max;

    if (diff !== 0) {
        s = diff / max;

        if (max === rNorm) {
            h = 60 * (((gNorm - bNorm) / diff) % 6);
        } else if (max === gNorm) {
            h = 60 * ((bNorm - rNorm) / diff + 2);
        } else {
            h = 60 * ((rNorm - gNorm) / diff + 4);
        }
    }

    if (h < 0) h += 360;

    return {
        h: Math.round(h),
        s: Math.round(s * 100),
        v: Math.round(v * 100),
    };
};

// Convert RGB to HEX
export const rgbToHex = (r: number, g: number, b: number): string => {
    const toHex = (c: number) => {
        const hex = Math.round(c).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// Convert HEX to RGB
export const hexToRgb = (hex: string): RGBColor | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
};

// Convert HEX to HSV
export const hexToHsv = (hex: string): HSVColor | null => {
    const rgb = hexToRgb(hex);
    return rgb ? rgbToHsv(rgb.r, rgb.g, rgb.b) : null;
};

// Convert HSV to HEX
export const hsvToHex = (h: number, s: number, v: number): string => {
    const rgb = hsvToRgb(h, s, v);
    return rgbToHex(rgb.r, rgb.g, rgb.b);
};

// Validate HEX color
export const isValidHex = (hex: string): boolean => {
    return /^#?([a-f\d]{3}|[a-f\d]{6})$/i.test(hex);
};

// Normalize HEX color (ensure 6 digits and # prefix)
export const normalizeHex = (hex: string): string => {
    hex = hex.replace("#", "");
    if (hex.length === 3) {
        hex = hex
            .split("")
            .map((c) => c + c)
            .join("");
    }
    return `#${hex}`;
};

// Get hue color (pure hue without saturation/value modifications)
export const getHueColor = (hue: number): string => {
    return hsvToHex(hue, 100, 100);
};

// Clamp value between min and max
export const clamp = (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max);
};
