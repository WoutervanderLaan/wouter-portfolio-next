"use client";

import { MotionDiv } from "@/components/atoms/motion-element/motion-element";
import { useToggleState } from "react-stately";
import { useToggleButton } from "react-aria";
import { ReactNode, useRef } from "react";
import { InputBase } from "@react-types/shared";
import clsx from "clsx";

type ToggleButtonProps = InputBase & {
  isSelected?: boolean;
  onChange?: (isSelected: boolean) => void;
  children?: ReactNode;
};

const ToggleButton = (props: ToggleButtonProps) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const state = useToggleState(props);
  const { buttonProps, isPressed } = useToggleButton(props, state, ref);

  const { children } = props;
  const { isSelected } = state;

  return (
    <button
      ref={ref}
      {...buttonProps}
      className={clsx(
        "relative flex h-6 min-w-[46px] flex-row items-center justify-between gap-1 rounded-full border-[1px] border-black bg-white p-0.5 hover:opacity-50 dark:border-white dark:bg-black",
        "outline-none ring-blue-500 ring-offset-transparent transition focus-visible:ring-2",
        { "scale-90": isPressed },
      )}
    >
      {children}

      <MotionDiv
        className="absolute top-0 mt-[1px] h-5 w-5 rounded-full border-[1px] border-black bg-white dark:border-white dark:bg-black"
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
