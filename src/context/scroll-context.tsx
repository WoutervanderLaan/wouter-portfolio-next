"use client";

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

type TScrollContext = {
  isScrollEnabled: boolean;
  setIsScrollEnabled: Dispatch<SetStateAction<boolean>>;
};

const ScrollContext = createContext<null | TScrollContext>(null);

const ScrollContextProvider = ({ children }: PropsWithChildren) => {
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);

  return (
    <ScrollContext.Provider value={{ isScrollEnabled, setIsScrollEnabled }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollContext = () => {
  const scrollContext = useContext(ScrollContext);

  if (!scrollContext) throw new Error("Context used outside provider");

  return scrollContext;
};

export default ScrollContextProvider;
