"use client";

import React, { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useOverlayTrigger } from "react-aria";
import Modal from "@/components/atoms/modal/modal";
import { OverlayTriggerProps, useOverlayTriggerState } from "react-stately";

type UseModalProps = {
  isDismissable?: boolean;
} & OverlayTriggerProps;

type UseModalReturn = {
  triggerProps: React.HTMLAttributes<HTMLElement>;
  openModal: (content: React.ReactElement) => void;
  closeModal: () => void;
  isOpen: boolean;
};

export const useModal = (props: UseModalProps = {}): UseModalReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactElement | null>(
    null,
  );
  const state = useOverlayTriggerState(props);

  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
  );

  const openModal = useCallback(
    (content: React.ReactElement) => {
      setModalContent(React.cloneElement(content, { ...overlayProps }));
      setIsOpen(true);
    },
    [overlayProps],
  );

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalContent(null);
  }, []);

  const renderModal = () => {
    if (!isOpen || !modalContent) return null;

    return createPortal(
      <Modal
        isDismissable={props.isDismissable}
        close={closeModal}
        state={{ isOpen, close: closeModal }}
      >
        {modalContent}
      </Modal>,
      document.body,
    );
  };

  if (typeof window !== "undefined") {
    renderModal(); // Ensure the modal is rendered dynamically
  }

  return { triggerProps, openModal, closeModal, isOpen };
};
