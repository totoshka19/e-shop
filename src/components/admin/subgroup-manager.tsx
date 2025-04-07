import AddEntity from './add-entity';
import SelectEntity from './select-entity';
import { useState } from 'react';
import styles from '../../styles/admin/group-manager.module.scss';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';

function SubgroupManager() {
  const groups = useSelector((state: RootState) => state.categories.categories);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleAddSubgroup = (subgroupName: string) => {
    if (!selectedGroup) {
      setHasError(true);
      return;
    }
    console.log(`Добавлена подгруппа "${subgroupName}" в группу "${selectedGroup}"`);
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
          onAdd={handleAddSubgroup}
        />
      </div>
    </div>
  );
}

export default SubgroupManager;


