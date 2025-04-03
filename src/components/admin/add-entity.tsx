import React, { useState } from 'react';
import styles from '../../styles/admin/add-entity.module.scss';

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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      </button>
    </div>
  );
}

export default AddEntity;
