import AddEntity from './add-entity';
import styles from '../../styles/admin/group-manager.module.scss';

function GroupManager() {
  const handleAddGroup = (groupName: string) => {
    console.log('Добавлена группа:', groupName);
  };

  return (
    <div className={styles['group-manager']}>
      <h2>Добавить группу товаров</h2>
      <AddEntity
        placeholder="Введите название группы"
        onAdd={handleAddGroup}
      />
    </div>
  );
}

export default GroupManager;
