import { HTMLAttributes, PropsWithChildren, useEffect, useRef } from "react";

type ResponsiveContainerProps = {
  className?: HTMLAttributes<HTMLDivElement>["className"];
  isActive?: boolean;
  callback: () => void;
};
const ResponsiveContainer = ({
  children,
  className,
  callback,
  isActive,
}: PropsWithChildren<ResponsiveContainerProps>) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const handleClickOutside = (event: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      )
        callback();
    };

    window.addEventListener("pointerdown", handleClickOutside);
    return () => window.removeEventListener("pointerdown", handleClickOutside);
  }, [isActive]);

  return (
    <div className={className} ref={containerRef}>
      {children}
    </div>
  );
};

export default ResponsiveContainer;
