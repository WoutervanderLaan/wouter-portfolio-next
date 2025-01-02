import Button from "@/components/atoms/button/button";

const CloseButton = ({
  onPress,
  className,
}: {
  onPress: () => void;
  className?: string;
}) => {
  return (
    <Button onPress={onPress} variant="circle" className={className}>
      x
    </Button>
  );
};

export default CloseButton;
