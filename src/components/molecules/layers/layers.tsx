import { Fragment, useState } from "react";
import clsx from "clsx";
import Button from "@/components/atoms/button/button";
import Text from "@/components/atoms/text/text";
import Cross from "@/components/icons/cross";
import LayerIcon from "@/components/icons/layer";
import useCanvasStore from "@/hooks/store-hooks/use-canvas-store";

const Layers = () => {
    const { activeLayerIndex, layers } = useCanvasStore();

    return (
        <Fragment>
            {layers.map((_, index) => (
                <Layer
                    key={index}
                    active={index === activeLayerIndex}
                    index={index}
                />
            ))}
        </Fragment>
    );
};

export default Layers;

const Layer = ({ active, index }: { active: boolean; index: number }) => {
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const { removeLayer, switchActiveLayer, layers } = useCanvasStore();

    return (
        <div
            className={clsx(
                "relative flex flex-row border-t-[1px] border-black",
                {
                    "bg-blue-300": active,
                },
            )}
            onMouseEnter={() => setIsTooltipOpen(true)}
            onMouseLeave={() => setIsTooltipOpen(false)}
        >
            <Button
                variant="unstyled"
                onPress={() => switchActiveLayer(index)}
                className="flex flex-1 items-center justify-evenly border-l border-black py-2"
            >
                <LayerIcon size={16} /> <Text.Small>{index + 1}</Text.Small>
            </Button>
            {isTooltipOpen && (
                <Button
                    variant="unstyled"
                    onPress={() => removeLayer(index)}
                    isDisabled={layers.length === 1}
                    className="absolute right-0 top-0 z-10 flex aspect-square h-4 w-4 flex-1 items-center justify-center border border-black bg-white"
                >
                    <Cross size={8} />
                </Button>
            )}
        </div>
    );
};
