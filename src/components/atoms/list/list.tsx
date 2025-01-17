import { PropsWithChildren } from "react";
import clsx from "clsx";

type ListProps = {
  className?: string;
};

const List = ({ children, className }: PropsWithChildren<ListProps>) => {
  return <ul className={clsx(className)}>{children}</ul>;
};

const Item = ({ children, className }: PropsWithChildren<ListProps>) => {
  return <li className={clsx(className)}>{children}</li>;
};

List.Item = Item;

export default List;
