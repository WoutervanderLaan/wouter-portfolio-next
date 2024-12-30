"use client";

import Button from "@/components/atoms/button/button";
import Text from "@/components/atoms/text/text";

const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    variant="circle"
    className="absolute top-4 right-4 bg-white/10"
    onClick={onClick}
  >
    <Text.Small className="text-white">X</Text.Small>
  </Button>
);

export default CloseButton;
