"use client";

import { MotionDiv } from "@/components/atoms/motion-element/motion-element";
import { useToggleState } from "react-stately";
import {
    AriaToggleButtonProps,
    useFocusRing,
    useToggleButton,
} from "react-aria";
import { ReactNode, useRef } from "react";
import { InputBase } from "@react-types/shared";
import clsx from "clsx";
import { ClassName } from "@/lib/types/class-name";

type ToggleButtonProps = InputBase &
    AriaToggleButtonProps & {
        isSelected?: boolean;
        onChange?: (isSelected: boolean) => void;
        children?: ReactNode;
        className?: ClassName<HTMLButtonElement>;
    };

const ToggleButton = (props: ToggleButtonProps) => {
    const ref = useRef<HTMLButtonElement | null>(null);
    const state = useToggleState(props);
    const { buttonProps, isPressed } = useToggleButton(props, state, ref);
    const { isFocusVisible, focusProps } = useFocusRing();

    const { children, className } = props;
    const { isSelected } = state;

    return (
        <button
            ref={ref}
            {...buttonProps}
            {...focusProps}
            className={clsx(
                "relative flex h-6 min-w-[46px] flex-row items-center justify-between gap-1 rounded-full border border-black bg-white p-0.5 outline-none ring-offset-transparent transition hover:opacity-50 dark:border-white dark:bg-black",
                { "scale-90": isPressed },
                {
                    "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2":
                        isFocusVisible,
                },
                className,
            )}
        >
            {children}

            <MotionDiv
                className="absolute top-0 mt-[1px] h-5 w-5 rounded-full border border-black bg-white dark:border-white dark:bg-black"
                animate={{
                    left: isSelected ? 23 : 1,
                }}
                transition={{
                    duration: 0.2,
                }}
            />
        </button>
    );
};

export default ToggleButton;
