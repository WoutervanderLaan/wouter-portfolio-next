import Button from "@/components/atoms/button/button";
import { useRef } from "react";

type ColorPickerProps = {
  color: string;
  setColor: (color: string) => void;
  disabled?: boolean;
};

const ColorPicker = ({ color, setColor, disabled }: ColorPickerProps) => {
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!disabled) {
      hiddenInputRef.current?.click();
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <Button
        onPress={handleClick}
        variant="unstyled"
        isDisabled={disabled}
        className="self-start"
      >
        <div
          className="h-10 w-10 border border-black"
          style={{ backgroundColor: color }}
        />
      </Button>

      <input
        id="color-picker"
        ref={hiddenInputRef}
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="absolute h-0 w-0 overflow-hidden opacity-0"
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  );
};

export default ColorPicker;
