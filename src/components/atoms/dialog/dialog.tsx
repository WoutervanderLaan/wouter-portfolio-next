"use client";

import { useRef } from "react";
import type { AriaDialogProps } from "react-aria";
import { useDialog } from "react-aria";
import Text from "../text/text";

interface DialogProps extends AriaDialogProps {
  title?: React.ReactNode;
  children: React.ReactNode;
}

const Dialog = ({
  title,
  children,
  ...props
}: DialogProps & AriaDialogProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { dialogProps, titleProps } = useDialog(props, ref);

  return (
    <div
      {...dialogProps}
      ref={ref}
      className="flex flex-col items-center justify-center gap-10 outline-none"
    >
      {title && (
        <Text.Heading as="h3" {...titleProps}>
          {title}
        </Text.Heading>
      )}

      {children}
    </div>
  );
};

export default Dialog;
