import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import styles from '../../styles/admin/group-manager.module.scss';
import {deleteCategory, updateCategory} from '../../store/admin/categories-slice';

function GroupsList() {
  const dispatch = useDispatch<AppDispatch>();
  const groups = useSelector((state: RootState) => state.categories.categories); // Категории = Группы
  const status = useSelector((state: RootState) => state.categories.status);
  const error = useSelector((state: RootState) => state.categories.error);

  // Обработчик удаления категории
  const handleDelete = (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить эту группу?')) {
      dispatch(deleteCategory(id));
    }
  };

  // Обработчик редактирования категории
  const handleEdit = async (id: number, currentName: string) => {
    const newName = prompt('Введите новое название группы:', currentName);
    if (newName && newName !== currentName) {
      await dispatch(updateCategory({ id, name: newName }));
    }
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
            <span className={styles['group-name']}>{group.name}</span>
            <div className={styles['group-actions']}>
              {/* Иконка редактирования */}
              <button
                className={styles['edit-btn']}
                onClick={() => {
                  handleEdit(group.id, group.name);
                }}
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
              {/* Иконка удаления */}
              <button
                className={styles['delete-btn']}
                onClick={() => handleDelete(group.id)} // Вызываем обработчик удаления
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
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupsList;
