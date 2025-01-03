"use client";

import clsx from "clsx";
import Link from "next/link";
import { PropsWithChildren, useRef } from "react";
import { AriaLinkOptions, useLink } from "react-aria";

const StyledLink = (
  props: PropsWithChildren<
    AriaLinkOptions & { className?: string; href: string }
  >,
) => {
  const ref = useRef(null);
  const { linkProps } = useLink(props, ref);

  const { className, children, href } = props;
  return (
    <Link
      ref={ref}
      className={clsx(
        "rounded-sm outline-none transition hover:opacity-50 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        className,
      )}
      href={href}
      {...linkProps}
    >
      {children}
    </Link>
  );
};

export default StyledLink;
