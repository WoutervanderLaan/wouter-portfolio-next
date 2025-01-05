"use client";

import React, { JSXElementConstructor, ReactElement } from "react";
import { OverlayTriggerAria } from "react-aria";
import Modal from "@/components/atoms/modal/modal";
import { OverlayTriggerState } from "react-stately";
import Dialog from "@/components/atoms/dialog/dialog";

type UseModalProps = {
  isDismissable?: boolean;
} & OverlayTriggerAria["overlayProps"];

export const useModal = (props: UseModalProps, state: OverlayTriggerState) => {
  const { isOpen } = state;

  const renderModal = (
    modalContent: ReactElement<
      unknown,
      string | JSXElementConstructor<unknown>
    >,
    isDismissable = false,
  ) => {
    if (!isOpen || !modalContent) return null;

    return (
      <Modal {...props} state={state} isDismissable={isDismissable}>
        {React.cloneElement(<Dialog>{modalContent}</Dialog>, { ...props })}
      </Modal>
    );
  };

  return renderModal;
};
