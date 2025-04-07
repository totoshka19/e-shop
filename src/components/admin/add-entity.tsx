import React, { useState } from 'react';
import styles from '../../styles/admin/add-entity.module.scss';
import {CheckIcon} from './icons';

type AddEntityProps = {
  placeholder: string;
  onAdd: (name: string) => void;
};

function AddEntity({ placeholder, onAdd }: AddEntityProps) {
  const [entityName, setEntityName] = useState('');
  const [isError, setIsError] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEntityName(event.target.value);
    setIsError(false);
  };

  const handleInputFocus = () => {
    setIsError(false);
  };

  const handleAdd = () => {
    if (entityName.trim()) {
      onAdd(entityName);
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  return (
    <div className={styles['input-group']}>
      <input
        type="text"
        placeholder={placeholder}
        value={entityName}
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
