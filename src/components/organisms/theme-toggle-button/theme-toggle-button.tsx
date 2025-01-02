"use client";

import Moon from "@/components/icons/moon";
import Sun from "@/components/icons/sun";
import { useTheme } from "next-themes";
import ToggleButton from "../../molecules/toggle-button/toggle-button";

const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <ToggleButton
      onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      isSelected={theme === "dark"}
    >
      <Sun />
      <Moon />
    </ToggleButton>
  );
};

export default ThemeToggleButton;
