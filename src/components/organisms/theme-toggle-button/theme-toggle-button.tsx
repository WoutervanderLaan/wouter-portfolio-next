"use client";

import Moon from "@/components/icons/moon";
import Sun from "@/components/icons/sun";
import ToggleButton from "../../molecules/toggle-button/toggle-button";
import { useThemeContext } from "@/hooks/use-theme";

const ThemeToggleButton = ({ className }: { className?: string }) => {
  const { isDarkMode, setIsDarkMode } = useThemeContext();

  return (
    <ToggleButton
      onChange={() => setIsDarkMode((prev) => !prev)}
      isSelected={isDarkMode}
      className={className}
      aria-label="dark/light mode toggle"
    >
      <Sun />
      <Moon />
    </ToggleButton>
  );
};

export default ThemeToggleButton;
