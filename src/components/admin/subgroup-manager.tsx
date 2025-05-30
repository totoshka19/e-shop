import AddEntity from './add-entity';
import SelectEntity from './select-entity';
import React, { useState } from 'react';
import styles from '../../styles/admin/group-manager.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import {createCategory, fetchCategories} from '../../store/admin/caregories-thunks';
import Popup from './popup';
import addEntityStyles from '../../styles/admin/add-entity.module.scss';

// !TODO объединить с GroupManager

function SubgroupManager() {
  const dispatch = useDispatch<AppDispatch>();
  const groups = useSelector((state: RootState) => state.categories.categories);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [subgroupName, setSubgroupName] = useState('');
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

  const handleAddSubgroup = async (newSubgroupName: string) => {
    if (!selectedGroup) {
      setHasError(true);
      return;
    }

    const selectedGroupId: number | undefined = groups.find((group) => group.name === selectedGroup)?.id;

    if (!selectedGroupId) {
      setHasError(true);
      return;
    }

    try {
      await dispatch(
        createCategory({
          name: newSubgroupName,
          // eslint-disable-next-line camelcase
          parent_category_id: selectedGroupId,
        })
      ).unwrap();

      dispatch(fetchCategories()).then(() => {
        openPopup(
          <>
            Подгруппа <strong>{newSubgroupName}</strong> успешно добавлена в группу{' '}
            <strong>{selectedGroup}</strong>.
          </>
        );
        setSubgroupName('');
      });
    } catch (error) {
      openPopup(
        <>
          Ошибка при добавлении подгруппы <strong>{newSubgroupName}</strong> в группу{' '}
          <strong>{selectedGroup}</strong>.
        </>
      );
    }
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
          className="group-select-width"
          options={groups.map((group) => group.name)}
          value={selectedGroup}
          onChange={handleSelectChange}
          placeholder="Выберите группу"
          hasError={hasError}
          onClearError={clearError}
        />

        <div className={addEntityStyles['subgroup-input']}>
          <AddEntity
            placeholder="Введите название подгруппы"
            value={subgroupName}
            onChange={(value: string) => setSubgroupName(value.trim())}
            onAdd={(newSubgroupName: string) => {
              void handleAddSubgroup(newSubgroupName);
            }}
          />
        </div>
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
