import AddEntity from './add-entity';
import SelectEntity from './select-entity';
import {useState} from 'react';
import styles from '../../styles/admin/group-manager.module.scss';

function SubgroupManager() {
  // Заглушка данных групп
  const groups = ['Группа 1', 'Группа 2', 'Группа 3'];

  // Состояние для выбранной группы
  const [selectedGroup, setSelectedGroup] = useState('');

  // Обработчик добавления подгруппы
  const handleAddSubgroup = (subgroupName: string) => {
    if (!selectedGroup) {
      alert('Выберите группу перед добавлением подгруппы');
      return;
    }
    console.log(`Добавлена подгруппа "${subgroupName}" в группу "${selectedGroup}"`);
  };

  return (
    <div className={styles['group-manager']}>
      <h2>Добавить подгруппу товаров</h2>
      <div className={styles['group-manager_wrapper']}>
        <SelectEntity
          options={groups} // Массив групп
          value={selectedGroup} // Текущее выбранное значение
          onChange={setSelectedGroup} // Обработчик изменения значения
          placeholder="Выберите группу" // Плейсхолдер
        />
        <AddEntity
          placeholder="Введите название группы"
          onAdd={handleAddSubgroup}
        />
      </div>

    </div>


  );
}

export default SubgroupManager;


