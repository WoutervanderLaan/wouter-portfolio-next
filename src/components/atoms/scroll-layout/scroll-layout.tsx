"use client";

import { useScrollContext } from "@/context/scroll-context";
import clsx from "clsx";
import { useScroll } from "framer-motion";
import { PropsWithChildren, useEffect, useState } from "react";

const ScrollLayout = ({ children }: PropsWithChildren) => {
  const { isScrollEnabled } = useScrollContext();
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
    <div
      className={clsx("flex flex-col min-h-screen container", {
        "max-h-screen overflow-y-hidden": !isScrollEnabled,
      })}
    >
      {children}
    </div>
  );
};

export default ScrollLayout;
