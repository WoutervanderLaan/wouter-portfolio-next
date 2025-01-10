"use client";

import Button from "@/components/atoms/button/button";
import Dialog from "@/components/atoms/dialog/dialog";
import Modal from "@/components/atoms/modal/modal";
import React, { JSXElementConstructor, ReactElement, ReactNode } from "react";
import { AriaButtonProps, useOverlayTrigger } from "react-aria";
import { OverlayTriggerProps, useOverlayTriggerState } from "react-stately";

type ModalTriggerProps = {
  children: ReactNode;
  modalContent: ReactElement<unknown, string | JSXElementConstructor<unknown>>;
  isDismissable?: boolean;
  isDisabled?: boolean;
  className?: string;
} & OverlayTriggerProps &
  AriaButtonProps;

const ModalTrigger = ({
  children,
  modalContent,
  className,
  ...props
}: ModalTriggerProps) => {
  const state = useOverlayTriggerState(props);
  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
  );

  const { isOpen } = state;

  return (
    <>
      <Button
        aria-label=""
        variant="unstyled"
        {...triggerProps}
        className={className}
        isDisabled={state.isOpen}
      >
        {children}
      </Button>
      {isOpen && (
        <Modal
          {...overlayProps}
          state={state}
          isDismissable={props.isDismissable}
        >
          {React.cloneElement(<Dialog>{modalContent}</Dialog>, { ...props })}
        </Modal>
      )}
    </>
  );
};

export default ModalTrigger;
