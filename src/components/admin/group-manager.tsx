import React, { useState } from 'react';
import AddEntity from './add-entity';
import styles from '../../styles/admin/group-manager.module.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { createCategory } from '../../store/admin/categories-slice';
import Popup from './popup';

function GroupManager() {
  const dispatch = useDispatch<AppDispatch>();

  // Состояние для управления попапом
  const [popup, setPopup] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: '',
  });

  // Функция для открытия попапа с сообщением
  const openPopup = (message: string) => {
    setPopup({ isOpen: true, message });
  };

  // Функция для закрытия попапа
  const closePopup = () => {
    setPopup({ isOpen: false, message: '' });
  };

  const handleAddGroup = async (groupName: string) => {
    try {
      await dispatch(createCategory(groupName)).unwrap();
      openPopup(`Категория успешно добавлена: ${groupName}`);
    } catch (error) {
      openPopup('Ошибка при добавлении категории');
    }
  };

  return (
    <div className={styles['group-manager']}>
      <h2>Добавить группу товаров</h2>
      <AddEntity
        placeholder="Введите название группы"
        onAdd={(groupName) => {
          void handleAddGroup(groupName); // Игнорируем Promise
        }}
      />
      {/* Попап */}
      <Popup
        isOpen={popup.isOpen}
        message={popup.message}
        onClose={closePopup}
      />
    </div>
  );
}

export default GroupManager;
