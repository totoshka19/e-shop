import React, { useState } from 'react';
import AddEntity from './add-entity';
import styles from '../../styles/admin/group-manager.module.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { createCategory } from '../../store/admin/thunks';
import Popup from './popup';

// !TODO объединить с SubgroupManager

function GroupManager() {
  const dispatch = useDispatch<AppDispatch>();

  const [popup, setPopup] = useState<{ isOpen: boolean; message: React.ReactNode }>({
    isOpen: false,
    message: '',
  });

  const openPopup = (message: React.ReactNode) => {
    setPopup({ isOpen: true, message });
  };

  const closePopup = () => {
    setPopup({ isOpen: false, message: '' });
  };

  const handleAddGroup = async (groupName: string) => {
    if (!groupName.trim()) {
      openPopup('Введите название группы.');
      return;
    }

    try {
      await dispatch(
        createCategory({
          name: groupName,
        })
      ).unwrap();
      openPopup(
        <>
          Группа успешно добавлена: <strong>{groupName}</strong>
        </>
      );
    } catch (error) {
      openPopup(
        <>
          Ошибка при добавлении группы: <strong>{groupName}</strong>
        </>
      );
    }
  };

  return (
    <div className={styles['group-manager']}>
      <h2>Добавить группу товаров</h2>
      <AddEntity
        placeholder="Введите название группы"
        onAdd={(groupName) => {
          void handleAddGroup(groupName);
        }}
      />

      <Popup
        isOpen={popup.isOpen}
        message={popup.message}
        onClose={closePopup}
        type="info"
      />
    </div>
  );
}

export default GroupManager;
