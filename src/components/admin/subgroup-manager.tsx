import AddEntity from './add-entity';
import SelectEntity from './select-entity';
import React, { useState } from 'react';
import styles from '../../styles/admin/group-manager.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { createCategory } from '../../store/admin/thunks';
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

    try {
      await dispatch(
        createCategory({
          name: subgroupName,
          // eslint-disable-next-line camelcase
          parent_category_id: selectedGroupId,
        })
      ).unwrap();
      openPopup(
        <>
          Подгруппа <strong>{subgroupName}</strong> успешно добавлена в группу{' '}
          <strong>{selectedGroup}</strong>.
        </>
      );
    } catch (error) {
      openPopup(
        <>
          Ошибка при добавлении подгруппы <strong>{subgroupName}</strong> в группу{' '}
          <strong>{selectedGroup}</strong>.
        </>
      );
    }

    setSelectedGroup('');
    setHasError(false);
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
        <SelectEntity
          options={groups.map((group) => group.name)}
          value={selectedGroup}
          onChange={handleSelectChange}
          placeholder="Выберите группу"
          hasError={hasError}
          onClearError={clearError}
        />

        <AddEntity
          placeholder="Введите название подгруппы"
          onAdd={(subgroupName) => {
            void handleAddSubgroup(subgroupName);
          }}
        />
      </div>

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
