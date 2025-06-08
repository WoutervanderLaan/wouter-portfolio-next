import Button from "@/components/atoms/button/button";
import { MotionAside } from "@/components/atoms/motion-element/motion-element";
import Arrow from "@/components/icons/arrow";
import clsx from "clsx";
import { HTMLAttributes, PropsWithChildren, useState } from "react";

const Sidebar = ({
    children,
    side = "left",
    className,
}: PropsWithChildren<{
    side?: "left" | "right";
    className?: HTMLAttributes<HTMLElement>["className"];
}>) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const initial = side === "left" ? { x: "-90%" } : { x: "90%" };
    const animate =
        side === "left"
            ? { x: isExpanded ? 0 : "-90%" }
            : { x: isExpanded ? "90%" : 0 };

    return (
        <MotionAside
            initial={initial}
            animate={animate}
            className={clsx(
                "absolute z-20 h-fit w-fit border-r border-black bg-white",
                { "right-0": side === "right" },
                { "left-0": side === "left" },
                className,
            )}
            transition={{
                type: "tween",
                duration: 0.2,
            }}
        >
            <Button
                className={clsx(
                    "absolute bottom-10 flex h-6 w-16 items-center justify-end border border-l-0 border-black bg-white pr-4 hover:scale-110",
                    { "-right-16": side === "left" },
                    {
                        "-left-16 translate-x-[1px] rotate-180":
                            side === "right",
                    },
                )}
                variant="unstyled"
                onPress={() => setIsExpanded((prev) => !prev)}
            >
                {side === "left" && (
                    <Arrow direction={isExpanded ? "left" : "right"} />
                )}
                {side === "right" && (
                    <Arrow direction={isExpanded ? "right" : "left"} />
                )}
            </Button>

            {children}
        </MotionAside>
    );
};

export default Sidebar;
