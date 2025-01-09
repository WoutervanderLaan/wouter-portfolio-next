"use client";

import clsx from "clsx";
import Link from "next/link";
import { PropsWithChildren, useRef } from "react";
import { AriaLinkOptions, useFocusRing, useLink } from "react-aria";

const StyledLink = (
  props: PropsWithChildren<
    AriaLinkOptions & { className?: string; href: string }
  >,
) => {
  const ref = useRef(null);
  const { linkProps, isPressed } = useLink(props, ref);
  const { isFocusVisible, focusProps } = useFocusRing();

  const { className, children, href } = props;
  return (
    <Link
      ref={ref}
      className={clsx(
        "outline-none ring-offset-transparent transition",
        { "scale-90": isPressed },
        {
          "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2":
            isFocusVisible,
        },
        className,
      )}
      href={href}
      {...linkProps}
      {...focusProps}
    >
      {children}
    </Link>
  );
};

export default StyledLink;
