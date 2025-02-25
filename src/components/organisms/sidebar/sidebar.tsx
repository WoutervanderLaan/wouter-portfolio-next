import Button from "@/components/atoms/button/button";
import { MotionAside } from "@/components/atoms/motion-element/motion-element";
import Arrow from "@/components/icons/arrow";
import clsx from "clsx";
import { PropsWithChildren, useState } from "react";

const Sidebar = ({ children }: PropsWithChildren) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <MotionAside
      initial={{ x: "-90%" }}
      animate={{ x: isExpanded ? 0 : "-90%" }}
      className={clsx(
        "absolute z-20 h-full w-fit border-r border-black bg-white",
        "outline-none ring-offset-2 transition-colors focus-visible:ring-4 focus-visible:ring-blue-500",
      )}
      transition={{
        type: "tween",
        duration: 0.2,
      }}
    >
      <Button
        className="absolute -right-14 bottom-10 flex h-6 w-16 items-center justify-end border border-l-0 border-black bg-white pr-4 hover:scale-110 hover:opacity-100"
        variant="unstyled"
        onPress={() => setIsExpanded((prev) => !prev)}
      >
        <Arrow direction={isExpanded ? "left" : "right"} />
      </Button>

      {children}
    </MotionAside>
  );
};

export default Sidebar;
