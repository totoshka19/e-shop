import React, { useRef } from 'react';
import styles from '../../styles/admin/popup.module.scss';
import {usePopUp} from '../../hooks/use-pop-up';

type PopupProps = {
  isOpen: boolean;
  message: string;
  onClose: () => void;
};

function Popup({ isOpen, message, onClose }: PopupProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const initialFocusRef = useRef<HTMLButtonElement | null>(null);

  const { handleOverlayClick } = usePopUp({
    onClose,
    initialFocusRef,
    modalRef,
    isOpen,
  });

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.popup} onClick={handleOverlayClick}>
      <div className={styles['popup-content']} ref={modalRef}>
        <p>{message}</p>
        <button ref={initialFocusRef} onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
}

export default Popup;
