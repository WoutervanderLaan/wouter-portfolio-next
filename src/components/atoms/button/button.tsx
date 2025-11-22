"use client";

import { ClassName } from "@/lib/types/class-name";
import clsx from "clsx";
import { ElementType, ReactNode, useRef } from "react";
import { AriaButtonOptions, useButton, useFocusRing } from "react-aria";

type Variant =
    | "primary"
    | "secondary"
    | "error"
    | "link"
    | "circle"
    | "unstyled";

const variantStyles: Record<Variant, string> = {
    primary:
        "bg-black dark:bg-white rounded-md py-2 px-4 text-white dark:text-black",
    secondary:
        "bg-white dark:bg-black border border-black dark:border-white p-2 rounded-md",
    error: "bg-red-500 border border-red-500 p-2 rounded-md",
    link: "underline underline-offset-2",
    circle: "h-10 w-10 rounded-full flex justify-center items-center hover:opacity-50 border dark:border-white border-black",
    unstyled: "",
};

type ButtonProps = {
    children: ReactNode;
    className?: ClassName<HTMLButtonElement>;
    variant?: Variant;
};

const Button = (props: ButtonProps & AriaButtonOptions<ElementType>) => {
    const ref = useRef<HTMLButtonElement>(null);

    const { buttonProps, isPressed } = useButton(props, ref);
    const { isFocusVisible, focusProps } = useFocusRing();

    const { children, variant = "unstyled", className } = props;

    return (
        <button
            ref={ref}
            {...buttonProps}
            {...focusProps}
            className={clsx(
                "outline-none ring-offset-2 transition-all",
                { "scale-90": isPressed },
                { "opacity-50": props.isDisabled },
                {
                    "focus-visible:ring-4 focus-visible:ring-blue-500":
                        isFocusVisible,
                },
                className,
                variantStyles[variant],
            )}
        >
            {children}
        </button>
    );
};

export default Button;
