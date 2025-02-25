import Text from "@/components/atoms/text/text";
import { ChangeEventHandler, FocusEventHandler } from "react";

type SliderProps = {
  ariaLabel: string;
  showNumericValue?: boolean;
  value: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: FocusEventHandler<HTMLInputElement>;
  min?: number;
  max?: number;
};

const Slider = ({
  ariaLabel,
  showNumericValue,
  value,
  onChange,
  min = 1,
  max = 100,
  onBlur,
}: SliderProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <input
        onBlur={onBlur}
        type="range"
        id={ariaLabel}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        aria-label={ariaLabel}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg border border-black ring-offset-2 transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500"
      />
      {showNumericValue && <Text.Small className="w-8">{value}</Text.Small>}
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 6px;
          height: 6px;
          background-color: black;
          border-radius: 50%;
        }

        input[type="range"]::-moz-range-thumb {
          appearance: none;
          width: 6px;
          height: 6px;
          background-color: black;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default Slider;
