"use client";

import clsx from "clsx";
import { useScroll } from "framer-motion";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type TScrollContext = {
  isScrollEnabled: boolean;
  setIsScrollEnabled: Dispatch<SetStateAction<boolean>>;
};

const ScrollContext = createContext<null | TScrollContext>(null);

const ScrollContextProvider = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);
  const { scrollY } = useScroll();
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {
    if (isScrollEnabled) {
      scrollTo(0, scrollValue);
      scrollY.on("change", (e) => setScrollValue(e));
    }
    return () => {
      scrollY.clearListeners();
    };
  }, [isScrollEnabled]);

  return (
    <ScrollContext.Provider value={{ isScrollEnabled, setIsScrollEnabled }}>
      <div
        className={clsx(className, {
          "max-h-screen overflow-y-hidden": !isScrollEnabled,
        })}
      >
        {children}
      </div>{" "}
    </ScrollContext.Provider>
  );
};

export const useScrollContext = () => {
  const scrollContext = useContext(ScrollContext);

  if (!scrollContext) throw new Error("Context used outside provider");

  return scrollContext;
};

export default ScrollContextProvider;
