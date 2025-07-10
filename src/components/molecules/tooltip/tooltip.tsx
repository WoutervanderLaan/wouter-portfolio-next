import { MotionLabel } from "@/components/atoms/motion-element/motion-element";
import Text from "@/components/atoms/text/text";
import { ClassName } from "@/lib/types/class-name";
import clsx from "clsx";
import { AnimatePresence } from "motion/react";
import { PropsWithChildren, useEffect, useState } from "react";

type TooltipProps = {
    tooltipText: string;
    className?: ClassName<HTMLDivElement>;
};

const Tooltip = ({
    children,
    tooltipText,
    className,
}: PropsWithChildren<TooltipProps>) => {
    const [openTip, setOpenTip] = useState(false);

    useEffect(
        function closeTooltip() {
            if (openTip) {
                setTimeout(() => setOpenTip(false), 1000);
            }
        },
        [openTip],
    );

    return (
        <div
            className={clsx("relative w-fit", className)}
            onMouseEnter={() => setOpenTip(true)}
            onMouseLeave={() => setOpenTip(false)}
        >
            <div>{children}</div>
            <AnimatePresence>
                {openTip && (
                    <MotionLabel
                        transition={{ duration: 0.1 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="pointer-events-none absolute -right-[84px] -top-2 z-10 flex h-6 min-w-20 items-center justify-center rounded-md rounded-bl-none border border-black bg-white"
                    >
                        <Text.Small>{tooltipText}</Text.Small>
                    </MotionLabel>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Tooltip;
