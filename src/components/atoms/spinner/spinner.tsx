import clsx from "clsx";
import { MotionDiv } from "../motion-element/motion-element";

const Spinner = ({ className }: { className?: string }) => (
  <MotionDiv
    className={clsx(
      "h-8 w-8 rounded-full border border-black border-t-gray-300 bg-transparent dark:border-white dark:border-t-gray-500",
      className,
    )}
    animate={{ rotate: 360 }}
    transition={{
      repeat: Infinity,
      duration: 1,
      ease: "linear",
    }}
  />
);

export default Spinner;
