import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {deleteCategory, updateCategory} from '../../store/admin/categories-slice';
import styles from '../../styles/admin/group-manager.module.scss';
import {useState} from 'react';
import {CheckIcon, CrossIcon} from './icons';

function GroupsList() {
  const dispatch = useDispatch<AppDispatch>();
  const groups = useSelector((state: RootState) => state.categories.categories); // Категории = Группы
  const status = useSelector((state: RootState) => state.categories.status);
  const error = useSelector((state: RootState) => state.categories.error);
  const [editingGroupId, setEditingGroupId] = useState<number | null>(null);
  const [newName, setNewName] = useState<string>('');

  const handleDelete = (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить эту группу?')) {
      dispatch(deleteCategory(id));
    }
  };

  const startEdit = (id: number, currentName: string) => {
    setEditingGroupId(id);
    setNewName(currentName);
  };

  const saveEdit = async (id: number): Promise<void> => {
    if (newName.trim() !== '') {
      await dispatch(updateCategory({ id, name: newName })).unwrap();
      setEditingGroupId(null);
    }
  };

  const cancelEdit = () => {
    setEditingGroupId(null);
  };

  if (status === 'loading') {
    return (
      <div className={styles['group-manager']}>
        <p>Загрузка групп...</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className={styles['group-manager']}>
        <p>Ошибка: {error}</p>
      </div>
    );
  }

  return (
    <div className={styles['group-manager']}>
      <h2>Список групп</h2>
      <ul>
        {groups.map((group) => (
          <li key={group.id} className={styles['group-item']}>
            {editingGroupId === group.id ? (
              <div className={styles['edit-mode']}>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  autoFocus
                />
                <button
                  onClick={() => void saveEdit(group.id)}
                  className={styles['save-btn']}
                >
                  <CheckIcon />
                </button>
                <button onClick={cancelEdit} className={styles['cancel-btn']}>
                  <CrossIcon />
                </button>
              </div>
            ) : (
              <>
                <span className={styles['group-name']}>{group.name}</span>
                <div className={styles['group-actions']}>
                  <button
                    className={styles['edit-btn']}
                    onClick={() => startEdit(group.id, group.name)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>

                  <button
                    className={styles['delete-btn']}
                    onClick={() => handleDelete(group.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupsList;
