"use client";

import { CanvasElement } from "@/utils/canvas-utils";
import { useEffect, useRef, useState } from "react";
import { Image as KonvaImage, Transformer } from "react-konva";
import useCanvasStore from "@/hooks/store-hooks/use-canvas-store";
import { Image as KonvaImageType } from "konva/lib/shapes/Image";
import { Transformer as KonvaTransformerType } from "konva/lib/shapes/Transformer";
import { KonvaEventObject } from "konva/lib/Node";

interface CanvasImageProps {
    imageElement: CanvasElement;
    isSelected: boolean;
    onSelect: () => void;
}

const CanvasImage = ({
    imageElement,
    isSelected,
    onSelect,
}: CanvasImageProps) => {
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const imageRef = useRef<KonvaImageType>(null);
    const transformerRef = useRef<KonvaTransformerType>(null);

    const { updateImage } = useCanvasStore();

    useEffect(() => {
        if (!imageElement.src) return;

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            setImage(img);
        };
        img.src = imageElement.src;
    }, [imageElement.src]);

    useEffect(() => {
        if (isSelected && transformerRef.current && imageRef.current) {
            transformerRef.current.nodes([imageRef.current]);
            transformerRef.current?.getLayer()?.batchDraw();
        }
    }, [isSelected]);

    const handleDragEnd = (e: KonvaEventObject<Event>) => {
        updateImage(imageElement.id, {
            x: e.target.x(),
            y: e.target.y(),
        });
    };

    const handleTransformEnd = () => {
        if (!imageRef.current) return;

        const scaleX = imageRef.current.scaleX();
        const scaleY = imageRef.current.scaleY();

        imageRef.current.scaleX(1);
        imageRef.current.scaleY(1);

        updateImage(imageElement.id, {
            x: imageRef.current.x(),
            y: imageRef.current.y(),
            width: Math.max(5, imageRef.current.width() * scaleX),
            height: Math.max(5, imageRef.current.height() * scaleY),
        });
    };

    if (!image) return null;

    return (
        <>
            <KonvaImage
                ref={imageRef}
                image={image}
                x={imageElement.x}
                y={imageElement.y}
                width={imageElement.width || 300}
                height={imageElement.height || 200}
                draggable
                onClick={onSelect}
                onTap={onSelect}
                onDragEnd={handleDragEnd}
                onTransformEnd={handleTransformEnd}
            />
            {isSelected && (
                <Transformer
                    ref={transformerRef}
                    flipEnabled={false}
                    rotationSnaps={[0, 45, 90, 135, 180, 225, 270, 315]}
                    boundBoxFunc={(oldBox, newBox) => {
                        if (
                            Math.abs(newBox.width) < 5 ||
                            Math.abs(newBox.height) < 5
                        ) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </>
    );
};

export default CanvasImage;
