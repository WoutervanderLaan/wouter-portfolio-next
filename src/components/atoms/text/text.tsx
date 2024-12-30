import React, { PropsWithChildren } from "react";
import clsx from "clsx";

type Variant = "Heading" | "Paragraph" | "Small";
type TextElements = "p" | "span" | "h1" | "h2" | "h3";

const variantStyles: Record<Variant, string> = {
  Heading: "font-thin text-xl",
  Paragraph: "font-thin text-base",
  Small: "font-thin text-sm",
};

type TextProps = {
  as?: TextElements;
  className?: string;
  variant?: Variant;
};

const TextBase = ({
  as = "p",
  variant = "Paragraph",
  children,
  className,
}: PropsWithChildren<TextProps>) => {
  const Component = as;
  const combinedClassName = clsx(
    "dark:text-white text-black",
    variantStyles[variant],
    className
  );
  return <Component className={combinedClassName}>{children}</Component>;
};

const Text = {
  Heading: (props: PropsWithChildren<Omit<TextProps, "variant">>) => (
    <TextBase {...props} variant="Heading" />
  ),
  Paragraph: (props: PropsWithChildren<Omit<TextProps, "variant">>) => (
    <TextBase {...props} variant="Paragraph" />
  ),
  Small: (props: PropsWithChildren<Omit<TextProps, "variant">>) => (
    <TextBase {...props} variant="Small" />
  ),
};

export default Text;
