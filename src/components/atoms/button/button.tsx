"use client";

import clsx from "clsx";
import { PropsWithChildren } from "react";

type Variant = "toggle" | "primary" | "circle" | "unstyled";

const variantStyles: Record<Variant, string> = {
  toggle:
    "flex flex-row rounded-full h-6 hover:opacity-50 flex justify-between items-center p-0.5 border-[1px] border-black dark:border-white bg-white dark:bg-black",
  primary:
    "w-fit px-9 py-5 rounded-custom bg-purple text-blue duration-200 hover:bg-blue hover:text-purple dark:bg-green dark:text-white dark:hover:bg-white dark:hover:text-green disabled:opacity-50",
  circle: "h-10 w-10 rounded-full hover:opacity-50 border-[1px] border-white",
  unstyled: "",
};

type ButtonProps = {
  onClick: () => void;
  className?: string;
  variant?: Variant;
  disabled?: boolean;
};

const Button = ({
  children,
  variant = "primary",
  onClick,
  className,
  disabled = false,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      onKeyDown={(e) => {
        e.stopPropagation();
        if (e.code === "Enter") onClick();
      }}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={clsx(
        "outline-none focus-visible:ring-2 ring-blue-500 ring-offset-transparent transition",
        className,
        variantStyles[variant]
      )}
    >
      {children}
    </button>
  );
};

export default Button;
