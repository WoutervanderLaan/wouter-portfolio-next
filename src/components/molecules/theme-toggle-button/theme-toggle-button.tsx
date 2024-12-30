"use client";

import Button from "@/components/atoms/button/button";
import { MotionDiv } from "@/components/atoms/motion-element/motion-element";
import Moon from "@/components/icons/moon";
import Sun from "@/components/icons/sun";
import { useTheme } from "next-themes";

const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      className="relative gap-1"
      variant="toggle"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun />
      <Moon />
      <MotionDiv
        className="absolute top-0 border-[1px] dark:border-white bg-white border-black dark:bg-black rounded-full h-5 w-5 mt-[1px]"
        animate={{
          left: theme === "dark" ? 1 : 23,
        }}
        transition={{
          duration: 0.2,
        }}
      />
    </Button>
  );
};

export default ThemeToggleButton;
