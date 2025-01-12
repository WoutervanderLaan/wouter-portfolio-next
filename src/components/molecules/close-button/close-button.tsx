"use client";

import Button from "@/components/atoms/button/button";
import Cross from "@/components/icons/cross";
import clsx from "clsx";

const CloseButton = ({
  onPress,
  className,
}: {
  onPress: () => void;
  className?: string;
}) => (
  <div className={clsx("z-10", className)}>
    <div className="absolute -left-[10%] -top-[10%] -z-10 h-[120%] w-[120%] rounded-full bg-white opacity-70 blur-sm dark:bg-black" />

    <Button onPress={onPress} variant="circle" aria-label="close modal">
      <Cross
        width={16}
        height={16}
        className="stroke-black dark:stroke-white"
      />
    </Button>
  </div>
);

export default CloseButton;
