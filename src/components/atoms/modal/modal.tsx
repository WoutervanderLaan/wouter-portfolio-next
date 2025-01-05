"use client";

import CloseButton from "@/components/molecules/close-button/close-button";
import { ReactNode, useRef } from "react";
import { AriaModalOverlayProps, Overlay, useModalOverlay } from "react-aria";
import { OverlayTriggerState } from "react-stately";

type ModalProps = {
  children: ReactNode;
  state: OverlayTriggerState;
};

const Modal = ({
  state,
  children,
  ...props
}: AriaModalOverlayProps & ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { modalProps, underlayProps } = useModalOverlay(props, state, ref);

  return (
    <Overlay>
      <div
        className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm dark:bg-black/70"
        {...underlayProps}
      >
        <CloseButton onPress={state.close} className="absolute right-4 top-4" />
        <div {...modalProps} ref={ref}>
          {children}
        </div>
      </div>
    </Overlay>
  );
};

export default Modal;
