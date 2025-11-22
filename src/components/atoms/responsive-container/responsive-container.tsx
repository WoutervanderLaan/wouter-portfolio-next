import { ClassName } from "@/lib/types/class-name";
import { PropsWithChildren, useEffect, useRef } from "react";

type ResponsiveContainerProps = {
    className?: ClassName<HTMLDivElement>;
    isActive?: boolean;
    callback: () => void;
};
const ResponsiveContainer = ({
    children,
    className,
    callback,
    isActive,
}: PropsWithChildren<ResponsiveContainerProps>) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isActive) return;

        const handleClickOutside = (event: PointerEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            )
                callback();
        };

        window.addEventListener("pointerdown", handleClickOutside);

        document.querySelectorAll("button").forEach((button) => {
            button.addEventListener("pointerdown", handleClickOutside);
        });
        return () => {
            window.removeEventListener("pointerdown", handleClickOutside);

            document.querySelectorAll("button").forEach((button) => {
                button.removeEventListener("pointerdown", handleClickOutside);
            });
        };
    }, [isActive]);

    return (
        <div className={className} ref={containerRef}>
            {children}
        </div>
    );
};

export default ResponsiveContainer;
