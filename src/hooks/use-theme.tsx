"use client";

import { ThemeContext } from "@/context/theme-context";
import { useContext } from "react";

const useThemeContext = () => {
  const overlayContext = useContext(ThemeContext);

  if (!overlayContext) throw Error("Theme context used outside provider");

  return overlayContext;
};

export default useThemeContext;
