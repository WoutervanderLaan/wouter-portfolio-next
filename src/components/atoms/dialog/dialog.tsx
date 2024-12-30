"use client";

import { ForwardedRef, forwardRef, JSX, PropsWithChildren } from "react";
import CloseButton from "@/components/molecules/close-button/close-button";
import { useScrollContext } from "@/context/scroll-context";
import { FocusScope } from "react-aria";

const Dialog = forwardRef(
  (
    {
      children,
      ...rest
    }: PropsWithChildren<Omit<JSX.IntrinsicElements["dialog"], "ref">>,
    modalRef: ForwardedRef<HTMLDialogElement>
  ) => {
    const { setIsScrollEnabled } = useScrollContext();

    const handleClose = () => {
      if (typeof modalRef !== "function") modalRef?.current?.close();
    };

    return (
      <FocusScope contain>
        <dialog
          onClose={() => setIsScrollEnabled(true)}
          ref={modalRef}
          {...rest}
          className="fixed top-0 left-0 w-screen h-screen z-10 backdrop-blur bg-black/60"
          onClick={handleClose}
        >
          <CloseButton onClick={handleClose} />
          {children}
        </dialog>
      </FocusScope>
    );
  }
);

Dialog.displayName = "Dialog";

export default Dialog;
