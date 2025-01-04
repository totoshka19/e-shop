import React, { useEffect } from 'react';

type UsePopUpOptions = {
  onClose: () => void;
  initialFocusRef?: React.RefObject<HTMLElement>;
  modalRef: React.RefObject<HTMLDivElement>;
};

export const usePopUp = ({ onClose, initialFocusRef, modalRef }: UsePopUpOptions) => {
  useEffect(() => {
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
  }, [onClose, initialFocusRef]);

  useEffect(() => {
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
  }, [modalRef]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return { handleOverlayClick };
};
