import React, { useRef } from 'react';
import styles from '../../styles/admin/popup.module.scss';
import {usePopUp} from '../../hooks/use-pop-up';

type PopupProps = {
  isOpen: boolean;
  message: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  type?: 'info' | 'confirmation';
};

function Popup({ isOpen, message, onClose, onConfirm, type = 'info' }: PopupProps) {
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
        <div className={styles['popup-actions']}>
          {type === 'info' ? (
            <button onClick={onClose}>Закрыть</button>
          ) : (
            <>
              <button onClick={onConfirm || onClose}>Да</button>
              <button onClick={onClose}>Нет</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Popup;
