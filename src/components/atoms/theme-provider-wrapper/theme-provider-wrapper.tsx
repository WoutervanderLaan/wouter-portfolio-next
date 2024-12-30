"use client";

import { ThemeProvider, ThemeProviderProps } from "next-themes";

export function ThemeProviderWrapper({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" {...props}>
      {children}
    </ThemeProvider>
  );
}
