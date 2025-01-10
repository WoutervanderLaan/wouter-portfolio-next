"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type ThemeContext = {
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
};

export const ThemeContext = createContext<ThemeContext | null>(null);

const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.querySelector("html")?.classList.add("dark");
    }
    if (!isDarkMode) {
      document.querySelector("html")?.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
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
