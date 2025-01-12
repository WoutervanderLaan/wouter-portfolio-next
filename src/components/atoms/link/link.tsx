"use client";

import clsx from "clsx";
import NextLink from "next/link";
import { PropsWithChildren, useRef } from "react";
import { AriaLinkOptions, useFocusRing, useLink } from "react-aria";

const Link = (
  props: PropsWithChildren<
    AriaLinkOptions & { className?: string; href: string }
  >,
) => {
  const ref = useRef(null);
  const { linkProps, isPressed } = useLink(props, ref);
  const { isFocusVisible, focusProps } = useFocusRing();

  const { className, children, href } = props;
  return (
    <NextLink
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
    </NextLink>
  );
};

export default Link;
