import React, { useState } from 'react';
import AddEntity from './add-entity';
import styles from '../../styles/admin/group-manager.module.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import {createCategory, fetchCategories} from '../../store/admin/thunks';
import Popup from './popup';

// !TODO объединить с SubgroupManager

function GroupManager() {
  const dispatch = useDispatch<AppDispatch>();

  const [popup, setPopup] = useState<{ isOpen: boolean; message: React.ReactNode }>({
    isOpen: false,
    message: '',
  });

  const [groupName, setGroupName] = useState<string>('');

  const openPopup = (message: React.ReactNode) => {
    setPopup({ isOpen: true, message });
  };

  const closePopup = () => {
    setPopup({ isOpen: false, message: '' });
  };

  const handleAddGroup = async (newGroupName: string) => {
    try {
      await dispatch(
        createCategory({
          name: newGroupName,
        })
      ).unwrap();

      await dispatch(fetchCategories());

      openPopup(
        <>
          Группа успешно добавлена: <strong>{newGroupName}</strong>
        </>
      );
      setGroupName(''); // Очищаем поле ввода
    } catch (error) {
      openPopup(
        <>
          Ошибка при добавлении группы: <strong>{newGroupName}</strong>
        </>
      );
    }
  };

  return (
    <div className={styles['group-manager']}>
      <h2>Добавить группу товаров</h2>
      <AddEntity
        placeholder="Введите название группы"
        value={groupName}
        onChange={(value) => setGroupName(value)}
        onAdd={(newGroupName) => {
          void handleAddGroup(newGroupName);
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
