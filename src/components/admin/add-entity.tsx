import React, { useState } from 'react';
import styles from '../../styles/admin/add-entity.module.scss';
import {CheckIcon} from './icons';

type AddEntityProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onAdd: (value: string) => void;
  className?: string;
};

function AddEntity({ placeholder, value, onChange, onAdd, className }: AddEntityProps) {
  const [isError, setIsError] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
    setIsError(false);
  };

  const handleInputFocus = () => {
    setIsError(false);
  };

  const handleAdd = () => {
    if (value.trim()) {
      onAdd(value);
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  return (
    <div className={`${styles['input-group']} ${className || ''}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        className={`${styles['input']} ${isError ? styles['error'] : ''}`}
      />
      <button onClick={handleAdd} className={styles['add-btn']}>
        <CheckIcon />
      </button>
    </div>
  );
}

export default AddEntity;
