"use client";

import clsx from "clsx";
import { ElementType, ReactNode, useRef } from "react";
import { AriaButtonOptions, useButton, useFocusRing } from "react-aria";

type Variant = "primary" | "circle" | "unstyled";

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-black dark:bg-white rounded-md py-2 px-4 text-white dark:text-black",
  circle:
    "h-10 w-10 rounded-full flex justify-center items-center hover:opacity-50 border-[1px] dark:border-white border-black",
  unstyled: "hover:opacity-50",
};

type ButtonProps = {
  children: ReactNode;
  className?: string;
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
        "outline-none ring-offset-transparent transition",
        { "scale-90": isPressed },
        { "opacity-50": props.isDisabled },

        {
          "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2":
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
