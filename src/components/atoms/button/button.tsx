"use client";

import clsx from "clsx";
import { ElementType, ReactNode, useRef } from "react";
import { AriaButtonOptions, useButton } from "react-aria";

type Variant = "primary" | "circle" | "unstyled";

const variantStyles: Record<Variant, string> = {
  primary:
    "w-fit px-9 py-5 rounded-custom bg-black text-white hover:text-black hover:bg-white border-black border-[1px] disabled:opacity-50",
  circle:
    "h-10 w-10 rounded-full hover:opacity-50 border-[1px] dark:border-white border-black",
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
  const { children, variant = "primary", className } = props;

  return (
    <button
      ref={ref}
      {...buttonProps}
      className={clsx(
        "outline-none ring-blue-500 ring-offset-transparent transition focus-visible:ring-2",
        { "scale-90": isPressed },
        className,
        variantStyles[variant],
      )}
    >
      {children}
    </button>
  );
};

export default Button;
