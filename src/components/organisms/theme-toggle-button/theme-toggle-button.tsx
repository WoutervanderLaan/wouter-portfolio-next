"use client";

import Moon from "@/components/icons/moon";
import Sun from "@/components/icons/sun";
import { useTheme } from "next-themes";
import ToggleButton from "../../molecules/toggle-button/toggle-button";

const ThemeToggleButton = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();

  return (
    <ToggleButton
      onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      isSelected={theme === "dark"}
      className={className}
      aria-label="dark/light mode toggle"
    >
      <Sun />
      <Moon />
    </ToggleButton>
  );
};

export default ThemeToggleButton;
