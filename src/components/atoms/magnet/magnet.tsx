"use client";

import {
  HTMLAttributes,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { MotionDiv, MotionLine } from "../motion-element/motion-element";
import clsx from "clsx";
import { Transition } from "motion";

interface MagnetProps extends HTMLAttributes<HTMLDivElement> {
  magnetStrength?: number;
  magneticAreaSize?: number | string;
  transition?: Transition;
  debug?: boolean;
}

type Coordinates = { x: number; y: number };

const DEFAULT_COORDINATES: Coordinates = {
  x: 0,
  y: 0,
};

const DEFAULT_TRANSITION: Transition = {
  duration: 0.1,
  ease: "easeOut",
  type: "tween",
};

const BOUNCE_TRANSITION: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 10,
  mass: 1,
};

const Magnet = ({
  children,
  magnetStrength = 0.5,
  magneticAreaSize = 40,
  transition = DEFAULT_TRANSITION,
  debug = false,
  style,
  className,
  ...rest
}: PropsWithChildren<MagnetProps>) => {
  const magneticAreaRef = useRef<HTMLDivElement>(null);
  const [magnetCoordinates, setMagnetCoordinates] =
    useState<Coordinates>(DEFAULT_COORDINATES);
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    const magnet = magneticAreaRef.current;
    if (!magnet) return;

    magnet.addEventListener("mousemove", magnetizeButton);
    magnet.addEventListener("mouseleave", resetMagnet);

    return () => {
      magnet.removeEventListener("mousemove", magnetizeButton);
      magnet.removeEventListener("mouseleave", resetMagnet);
    };
  }, [magneticAreaRef]);

  const resetMagnet = () => {
    setIsMouseOver(false);
    setMagnetCoordinates(DEFAULT_COORDINATES);
  };

  const magnetizeButton = (e: MouseEvent) => {
    if (!magneticAreaRef.current) return;
    setIsMouseOver(true);

    const boundingRect = magneticAreaRef.current.getBoundingClientRect();

    const mouseCoords = {
      x: e.clientX - boundingRect.left - boundingRect.width / 2,
      y: e.clientY - boundingRect.top - boundingRect.height / 2,
    };

    const x = mouseCoords.x * Math.min(1, magnetStrength);
    const y = mouseCoords.y * Math.min(1, magnetStrength);

    setMagnetCoordinates({ x, y });
  };

  return (
    <div
      ref={magneticAreaRef}
      className={clsx(
        "relative flex h-fit w-fit items-center justify-center rounded-full",
        { "border border-dashed border-black": debug },
        className,
      )}
      style={{ ...style, height: magneticAreaSize, aspectRatio: 1 / 1 }}
      {...rest}
    >
      {debug && (
        <svg
          className="pointer-events-none absolute inset-0"
          width="100%"
          height="100%"
        >
          <MotionLine
            x1="50%"
            y1="50%"
            x2={`calc(50% + ${magnetCoordinates.x}px)`}
            y2={`calc(50% + ${magnetCoordinates.y}px)`}
            stroke="black"
            strokeDasharray="4 4"
            strokeWidth="1"
            animate={{
              x2: `calc(50% + ${magnetCoordinates.x}px)`,
              y2: `calc(50% + ${magnetCoordinates.y}px)`,
            }}
            transition={DEFAULT_TRANSITION}
          />
        </svg>
      )}
      <MotionDiv
        className={clsx("rounded-full", {
          "border border-dashed border-black": debug,
        })}
        animate={magnetCoordinates}
        transition={
          isMouseOver
            ? { ...DEFAULT_TRANSITION, ...transition }
            : BOUNCE_TRANSITION
        }
        tabIndex={-1}
        draggable="false"
      >
        {children}
      </MotionDiv>
    </div>
  );
};

export default Magnet;
