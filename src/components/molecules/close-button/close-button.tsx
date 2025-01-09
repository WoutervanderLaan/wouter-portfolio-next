"use client";

import Button from "@/components/atoms/button/button";
import Cross from "@/components/icons/cross";

const CloseButton = ({
  onPress,
  className,
}: {
  onPress: () => void;
  className?: string;
}) => (
  <Button
    onPress={onPress}
    variant="circle"
    aria-label="close modal"
    className={className}
  >
    <Cross width={16} height={16} className="stroke-black dark:stroke-white" />
  </Button>
);

export default CloseButton;
