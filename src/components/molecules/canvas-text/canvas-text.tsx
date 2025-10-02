"use client";

import { CanvasElement } from "@/utils/canvas-utils";
import { useEffect, useRef } from "react";
import { Text as KonvaText, Transformer } from "react-konva";
import useCanvasStore from "@/hooks/store-hooks/use-canvas-store";
import { Text as KonvaTextType } from "konva/lib/shapes/Text";
import { Transformer as KonvaTransformerType } from "konva/lib/shapes/Transformer";
import { KonvaEventObject } from "konva/lib/Node";
import { useStage } from "@/hooks/use-stage";

interface CanvasTextProps {
    textElement: CanvasElement;
    isSelected: boolean;
    onSelect: () => void;
}

const CanvasText = ({ textElement, isSelected, onSelect }: CanvasTextProps) => {
    const textRef = useRef<KonvaTextType>(null);
    const transformerRef = useRef<KonvaTransformerType>(null);
    const { stageRef } = useStage();

    const { updateText } = useCanvasStore();

    useEffect(() => {
        if (isSelected && transformerRef.current && textRef.current) {
            transformerRef.current.nodes([textRef.current]);
            transformerRef.current?.getLayer()?.batchDraw();
        }
    }, [isSelected]);

    const handleDoubleClick = () => {
        if (!textRef.current || !transformerRef.current || !stageRef.current)
            return;

        const textNode = textRef.current;
        const transformer = transformerRef.current;
        const stage = stageRef.current;

        textNode.hide();
        transformer.hide();

        const textPosition = textNode.absolutePosition();
        const stageBox = stage.container().getBoundingClientRect();

        const areaPosition = {
            x: stageBox.left + textPosition.x,
            y: stageBox.top + textPosition.y,
        };

        const textarea = document.createElement("textarea");
        document.body.appendChild(textarea);

        textarea.value = textNode.text();
        textarea.style.position = "absolute";
        textarea.style.top = areaPosition.y + "px";
        textarea.style.left = areaPosition.x + "px";
        textarea.style.width = textNode.width() - textNode.padding() * 2 + "px";
        textarea.style.height =
            textNode.height() - textNode.padding() * 2 + 5 + "px";
        textarea.style.fontSize = textNode.fontSize() + "px";
        textarea.style.border = "none";
        textarea.style.padding = "0px";
        textarea.style.margin = "0px";
        textarea.style.overflow = "hidden";
        textarea.style.background = "none";
        textarea.style.outline = "none";
        textarea.style.resize = "none";
        textarea.style.lineHeight = textNode.lineHeight().toString();
        textarea.style.fontFamily = textNode.fontFamily();
        textarea.style.transformOrigin = "left top";
        textarea.style.textAlign = textNode.align();
        textarea.style.color = textNode.fill().toString();

        const rotation = textNode.rotation();
        let transform = "";
        if (rotation) {
            transform += "rotateZ(" + rotation + "deg)";
        }
        transform += "translateY(-" + 2 + "px)";
        textarea.style.transform = transform;

        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + 3 + "px";

        textarea.focus();

        function removeTextarea() {
            if (textarea.parentNode) {
                textarea.parentNode.removeChild(textarea);
            }
            window.removeEventListener("click", handleOutsideClick);
            window.removeEventListener("touchstart", handleOutsideClick);
            textNode.show();
            transformer.show();
            transformer.forceUpdate();
        }

        function setTextareaWidth(newWidth = 0) {
            if (!newWidth) {
                newWidth = textNode.text().length * textNode.fontSize();
            }
            textarea.style.width = newWidth + "px";
        }

        textarea.addEventListener("keydown", function (e) {
            if (e.key === "Enter" && !e.shiftKey) {
                updateText(textElement.id, { content: textarea.value });
                removeTextarea();
            }
            if (e.key === "Escape") {
                removeTextarea();
            }
        });

        textarea.addEventListener("input", function () {
            const scale = textNode.getAbsoluteScale().x;
            setTextareaWidth(textNode.width() * scale);
            textarea.style.height = "auto";
            textarea.style.height =
                textarea.scrollHeight + textNode.fontSize() + "px";
        });

        function handleOutsideClick(e: Event) {
            if (e.target !== textarea) {
                updateText(textElement.id, { content: textarea.value });
                removeTextarea();
            }
        }

        setTimeout(() => {
            window.addEventListener("click", handleOutsideClick);
            window.addEventListener("touchstart", handleOutsideClick);
        }, 0);
    };

    const handleDragEnd = (e: KonvaEventObject<Event>) => {
        updateText(textElement.id, {
            x: e.target.x(),
            y: e.target.y(),
        });
    };

    const handleTransformEnd = () => {
        if (!textRef.current) return;

        const node = textRef.current;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();

        node.scaleX(1);
        node.scaleY(1);

        updateText(textElement.id, {
            x: node.x(),
            y: node.y(),
            width: node.width() * scaleX,
            height: node.height() * scaleY,
        });
    };

    useEffect(() => {
        const textNode = textRef.current;
        if (!textNode) return;

        const handleTransform = () => {
            textNode.setAttrs({
                width: textNode.width() * textNode.scaleX(),
                scaleX: 1,
                height: textNode.height() * textNode.scaleY(),
                scaleY: 1,
            });
        };

        textNode.on("transform", handleTransform);

        return () => {
            textNode.off("transform", handleTransform);
        };
    }, []);

    return (
        <>
            <KonvaText
                ref={textRef}
                text={textElement.content || "Text"}
                x={textElement.x}
                y={textElement.y}
                width={textElement.width || 200}
                fontSize={12}
                fill="#000000"
                draggable
                onClick={onSelect}
                onTap={onSelect}
                onDblClick={handleDoubleClick}
                onDblTap={handleDoubleClick}
                onDragEnd={handleDragEnd}
                onTransformEnd={handleTransformEnd}
            />
            {isSelected && (
                <Transformer
                    ref={transformerRef}
                    flipEnabled={false}
                    rotationSnaps={[0, 45, 90, 135, 180, 225, 270, 315]}
                    boundBoxFunc={(_, newBox) => {
                        newBox.width = Math.max(30, newBox.width);
                        return newBox;
                    }}
                />
            )}
        </>
    );
};

export default CanvasText;
