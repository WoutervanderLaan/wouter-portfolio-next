import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes, PropsWithChildren } from "react";

const StyledLink = ({
  children,
  className,
  ...props
}: PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps>) => (
  <Link
    className={clsx(
      "hover:opacity-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 outline-none rounded-sm transition",
      className
    )}
    {...props}
  >
    {children}
  </Link>
);

export default StyledLink;
