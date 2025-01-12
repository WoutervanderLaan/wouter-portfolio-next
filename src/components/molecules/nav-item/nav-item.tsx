"use client";

import Link from "@/components/atoms/link/link";
import List from "@/components/atoms/list/list";
import Text from "@/components/atoms/text/text";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

type NavItemProps = {
  href: string;
  label?: string;
};

const NavItem = ({
  children,
  href,
  label,
}: PropsWithChildren<NavItemProps>) => {
  const pathName = usePathname();
  const path = pathName.replace("/", "");
  const navString =
    typeof children === "string" ? children?.toString().toLowerCase() : "";

  return (
    <List.Item>
      <Link href={href} className="pt-1" aria-label={label}>
        <Text.Heading
          as="span"
          className={clsx({
            "underline decoration-black decoration-1 underline-offset-2 dark:decoration-white":
              typeof children === "string" && path === navString,
          })}
        >
          {children}
        </Text.Heading>
      </Link>
    </List.Item>
  );
};

export default NavItem;
