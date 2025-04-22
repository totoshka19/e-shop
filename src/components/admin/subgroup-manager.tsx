import AddEntity from './add-entity';
import SelectEntity from './select-entity';
import React, { useState } from 'react';
import styles from '../../styles/admin/group-manager.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {createCategory} from '../../store/admin/thunks';
import Popup from './popup';

// !TODO объединить с GroupManager

function SubgroupManager() {
  const dispatch = useDispatch<AppDispatch>();
  const groups = useSelector((state: RootState) => state.categories.categories);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [hasError, setHasError] = useState(false);

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

  const handleAddSubgroup = async (subgroupName: string) => {
    if (!selectedGroup) {
      setHasError(true);
      return;
    }

    const selectedGroupId = groups.find((group) => group.name === selectedGroup)?.id;

    if (!selectedGroupId) {
      openPopup('Группа не найдена.');
      return;
    }

    // Выводим в консоль данные, которые отправляются на сервер
    const requestData = {
      name: subgroupName,
      parent_id: selectedGroupId,
    };
    console.log('Отправляемые данные на сервер:', requestData);

    try {
      await dispatch(
        createCategory({
          name: subgroupName,
          parent_id: selectedGroupId,
        })
      ).unwrap();

      openPopup(
        <>
          Подкатегория <strong>{subgroupName}</strong> успешно добавлена в категорию{' '}
          <strong>{selectedGroup}</strong>
        </>
      );
    } catch (error) {
      openPopup(
        <>
          Ошибка при добавлении подкатегории <strong>{subgroupName}</strong> в категорию{' '}
          <strong>{selectedGroup}</strong>
        </>
      );
    }

    setSelectedGroup('');
  };

  const handleSelectChange = (value: string) => {
    setSelectedGroup(value);
  };

  const clearError = () => {
    setHasError(false);
  };

  return (
    <div className={styles['group-manager']}>
      <h2>Добавить подгруппу товаров</h2>
      <div className={styles['group-manager_wrapper']}>
        {/* Выбор родительской категории */}
        <SelectEntity
          options={groups.map((group) => group.name)}
          value={selectedGroup}
          onChange={handleSelectChange}
          placeholder="Выберите группу"
          hasError={hasError}
          onClearError={clearError}
        />

        {/* Добавление подкатегории */}
        <AddEntity
          placeholder="Введите название подгруппы"
          onAdd={(subgroupName) => {
            void handleAddSubgroup(subgroupName);
          }}
        />
      </div>

      {/* Попап */}
      <Popup
        isOpen={popup.isOpen}
        message={popup.message}
        onClose={closePopup}
        type="info"
      />
    </div>
  );
}

export default SubgroupManager;


