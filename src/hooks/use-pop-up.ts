import React, { useEffect } from 'react';

type UsePopUpOptions = {
  onClose: () => void;
  initialFocusRef?: React.RefObject<HTMLElement>;
  modalRef: React.RefObject<HTMLDivElement>;
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

    if (initialFocusRef?.current) {
      initialFocusRef.current.focus();
    }

    const hasScrollbar = document.body.scrollHeight > window.innerHeight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (hasScrollbar) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [onClose, initialFocusRef, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
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
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  return { handleOverlayClick };
};
