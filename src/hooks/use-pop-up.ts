import React, { useEffect } from 'react';

type UsePopUpOptions = {
  onClose: () => void;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  modalRef: React.RefObject<HTMLDivElement | null>;
  isOpen: boolean;
};

export const usePopUp = ({ onClose, initialFocusRef, modalRef, isOpen }: UsePopUpOptions) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const initialFocusElement = initialFocusRef?.current;
    if (initialFocusElement) {
      initialFocusElement.focus();
    }

    const preventScroll = (event: Event) => {
      event.preventDefault();
    };

    document.body.addEventListener('wheel', preventScroll, { passive: false });
    document.body.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.paddingRight = '';
      document.body.removeEventListener('wheel', preventScroll);
      document.body.removeEventListener('touchmove', preventScroll);
    };
  }, [onClose, initialFocusRef, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        const modalElement = modalRef.current;
        if (!modalElement) {
          return;
        }

        const focusableElements = modalElement.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements && focusableElements.length > 0) {
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          } else if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleTabKey);

    return () => {
      window.removeEventListener('keydown', handleTabKey);
    };
  }, [modalRef, isOpen]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const modalElement = modalRef.current;
    if (modalElement && !modalElement.contains(event.target as Node)) {
      onClose();
    }
  };

  return { handleOverlayClick };
};
