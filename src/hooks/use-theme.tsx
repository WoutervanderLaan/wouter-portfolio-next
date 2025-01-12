"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type ThemeContext = {
  isDarkMode: boolean;
  setDarkMode: (value: boolean) => void;
};

export const ThemeContext = createContext<ThemeContext | null>(null);

const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !localStorage) return;

    const theme = localStorage.getItem("theme");
    setDarkMode(!!theme);
  }, []);

  const setDarkMode = useCallback((value: boolean) => {
    setIsDarkMode(value);
    if (value === false) {
      document.querySelector("html")?.classList.remove("dark");
      localStorage.removeItem("theme");
    }

    if (value === true) {
      document.querySelector("html")?.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        setDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;

export const useThemeContext = () => {
  const overlayContext = useContext(ThemeContext);

  if (!overlayContext) throw Error("Theme context used outside provider");

  return overlayContext;
};
