"use client";

import Button from "@/components/atoms/button/button";
import { useModal } from "@/hooks/use-modal";
import React, { JSXElementConstructor, ReactElement, ReactNode } from "react";
import { AriaButtonProps, useOverlayTrigger } from "react-aria";
import { OverlayTriggerProps, useOverlayTriggerState } from "react-stately";

type ModalTriggerProps = {
  children: ReactNode;
  modalContent: ReactElement<unknown, string | JSXElementConstructor<unknown>>;
  isDismissable?: boolean;
  isDisabled?: boolean;
  className?: string;
  extraAction?: () => void;
} & OverlayTriggerProps &
  AriaButtonProps;

const ModalTrigger = ({
  children,
  modalContent,
  className,
  extraAction,
  ...props
}: ModalTriggerProps) => {
  const state = useOverlayTriggerState(props);
  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
  );

  const renderModal = useModal(overlayProps, state);

  const { onPress } = triggerProps;

  return (
    <>
      <Button
        aria-label=""
        variant="unstyled"
        {...triggerProps}
        onPress={(e) => {
          if (!onPress) return;
          if (extraAction) extraAction();
          onPress(e);
        }}
        className={className}
        isDisabled={state.isOpen}
      >
        {children}
      </Button>
      {renderModal(modalContent, props.isDismissable)}
    </>
  );
};

export default ModalTrigger;
