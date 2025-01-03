"use client";

import Button from "@/components/atoms/button/button";
import Modal from "@/components/atoms/modal/modal";
import React, { ReactElement, ReactNode } from "react";
import { useOverlayTrigger } from "react-aria";
import {
  OverlayTriggerProps,
  OverlayTriggerState,
  useOverlayTriggerState,
} from "react-stately";

type ModalTriggerProps = {
  children: (close: OverlayTriggerState["close"]) => ReactElement;
  buttonContent: ReactNode;
  isDismissable?: boolean;
};

const ModalTrigger = ({
  buttonContent,
  children,
  ...props
}: OverlayTriggerProps & ModalTriggerProps) => {
  const state = useOverlayTriggerState(props);
  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
  );

  const { isOpen, close } = state;

  return (
    <>
      <Button variant="unstyled" {...triggerProps}>
        {buttonContent}
      </Button>
      {isOpen && (
        <Modal {...props} state={state} close={close}>
          {React.cloneElement(children(close), overlayProps)}
        </Modal>
      )}
    </>
  );
};

export default ModalTrigger;
