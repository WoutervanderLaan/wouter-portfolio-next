import { randomUUID } from "crypto";

export type CanvasElementType =
    | "image"
    | "sticky"
    | "text"
    | "group"
    | "relation";

export interface CanvasElement {
    id: string;
    type: CanvasElementType;
    x: number;
    y: number;
    width?: number;
    height?: number;
    src?: string;
    content?: string;
    children?: string[];
}

export interface Relation {
    id: string;
    type: "relation";
    from: string;
    to: string;
    style: {
        stroke: string;
        strokeWidth: number;
        arrow: boolean;
    };
}

export const addImage = (
    src: string,
    position: { x: number; y: number },
): CanvasElement => ({
    id: randomUUID(),
    type: "image",
    src,
    x: position.x,
    y: position.y,
    width: 300,
    height: 200,
});

export const addStickyNote = (
    content: string,
    position: { x: number; y: number },
): CanvasElement => ({
    id: randomUUID(),
    type: "sticky",
    content,
    x: position.x,
    y: position.y,
    width: 200,
    height: 150,
});

export const addText = (
    content: string,
    position: { x: number; y: number },
): CanvasElement => ({
    id: randomUUID(),
    type: "text",
    content,
    x: position.x,
    y: position.y,
    width: 200,
    height: 50,
});

export const removeElement = (
    id: string,
    elements: CanvasElement[],
): CanvasElement[] => elements.filter((el) => el.id !== id);

export const updateElement = (
    id: string,
    updates: Partial<CanvasElement>,
    elements: CanvasElement[],
): CanvasElement[] =>
    elements.map((el) => (el.id === id ? { ...el, ...updates } : el));

export const createRelation = (fromId: string, toId: string): Relation => ({
    id: randomUUID(),
    type: "relation",
    from: fromId,
    to: toId,
    style: {
        stroke: "#555",
        strokeWidth: 2,
        arrow: true,
    },
});

export const groupElements = (ids: string[]): CanvasElement => ({
    id: randomUUID(),
    type: "group",
    x: 0,
    y: 0,
    children: ids,
});

export const layoutMindMap = (
    rootId: string,
    elements: CanvasElement[],
    offset = { x: 0, y: 100 },
): CanvasElement[] => {
    const root = elements.find((e) => e.id === rootId);
    if (!root || !root.children) return elements;

    const childCount = root.children.length;
    const spacing = 200;

    const updated = [...elements];
    root.children.forEach((childId, index) => {
        const child = updated.find((e) => e.id === childId);
        if (child) {
            child.x = root.x + (index - childCount / 2) * spacing;
            child.y = root.y + offset.y;
        }
    });
    return updated;
};

// 🤖 AI Suggestion Hook (example)
export const generateSemanticGroupingPrompt = (
    elements: CanvasElement[],
): string => {
    const lines = elements
        .filter((el) => el.content)
        .map((el) => `- ${el.content}`)
        .join("\n");

    return `Group the following ideas into conceptual clusters:\n${lines}`;
};
