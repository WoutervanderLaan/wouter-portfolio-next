"use client";

import StyledLink from "@/components/atoms/link/link";
import List from "@/components/atoms/list/list";
import Text from "@/components/atoms/text/text";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

type NavItemProps = {
  href: string;
};

const NavItem = ({ children, href }: PropsWithChildren<NavItemProps>) => {
  const pathName = usePathname();
  const path = pathName.replace("/", "");
  const navString = children?.toString().toLowerCase();

  return (
    <List.Item>
      <StyledLink href={href}>
        <Text.Heading
          as="span"
          className={clsx({
            "underline decoration-1 underline-offset-2 decoration-black dark:decoration-white":
              typeof children === "string" && path === navString,
          })}
        >
          {children}
        </Text.Heading>
      </StyledLink>
    </List.Item>
  );
};

export default NavItem;
