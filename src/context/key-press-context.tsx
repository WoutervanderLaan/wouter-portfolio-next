"use client";

import { ReactNode, createContext, useEffect, useState } from "react";

type KeyPressContext = {
  pressedKeys: Array<string>;
};

export const KeyPressContext = createContext<KeyPressContext | null>(null);

const KeyPressContextProvider = ({ children }: { children: ReactNode }) => {
  const [pressedKeys, setPressedKeys] = useState(new Set<string>());

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      if (!pressedKeys.has(event.key)) {
        setPressedKeys((prev) => new Set(prev).add(event.key));
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      setPressedKeys((prev) => {
        const newSet = new Set(prev);
        newSet.delete(event.key);
        return newSet;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [pressedKeys]);

  // useEffect(() => {
  //   if (pressedKeys.size) setTimeout(() => setPressedKeys(new Set()), 2000);
  // }, [pressedKeys]);

  return (
    <KeyPressContext.Provider
      value={{
        pressedKeys: Array.from(pressedKeys),
      }}
    >
      {children}
    </KeyPressContext.Provider>
  );
};

export default KeyPressContextProvider;
