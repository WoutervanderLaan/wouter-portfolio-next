"use client";

import { ThemeContext } from "@/context/theme-context";
import { useContext } from "react";

export const useThemeContext = () => {
  const overlayContext = useContext(ThemeContext);

  if (!overlayContext) throw Error("Theme context used outside provider");

  return overlayContext;
};
