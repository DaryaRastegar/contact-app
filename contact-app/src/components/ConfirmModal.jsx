import React, { useEffect, useRef } from 'react';
import styles from './ConfirmModal.module.css';

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  const formRef = useRef();

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      onCancel();
    }
  };


  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent} ref={formRef}>
        <p>{message}</p>
        <div className={styles.modalActions}>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Confirm
          </button>
          <button className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
