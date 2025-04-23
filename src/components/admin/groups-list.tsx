import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { deleteCategory, fetchCategories, updateCategory } from '../../store/admin/thunks';
import styles from '../../styles/admin/group-manager.module.scss';
import React, { useState, useEffect } from 'react';
import { CheckIcon, CrossIcon, EditIcon, DeleteIcon, PlusIcon, MinusIcon } from './icons'; // Импортируем новые иконки
import Popup from './popup';

function GroupsList() {
  const dispatch = useDispatch<AppDispatch>();
  const groups = useSelector((state: RootState) => state.categories.categories); // Категории = Группы
  const error = useSelector((state: RootState) => state.categories.error);
  const [editingGroupId, setEditingGroupId] = useState<number | null>(null);
  const [newName, setNewName] = useState<string>('');
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<number | null>(null);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [errorPopupMessage, setErrorPopupMessage] = useState<React.ReactNode>('');
  const [expandedGroups, setExpandedGroups] = useState<number[]>([]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    setGroupToDelete(id);
    setIsDeletePopupOpen(true);
  };

  const confirmDelete = () => {
    if (groupToDelete !== null) {
      const foundGroup = groups.find((group) => group.id === groupToDelete);
      if (!foundGroup) {
        return;
      }

      if (Array.isArray(foundGroup.child) && foundGroup.child.length > 0) {
        const subcategoriesList = foundGroup.child.map((s) => s.name).join('\n');
        setErrorPopupMessage(
          <>
            Нельзя удалить группу <strong>{foundGroup.name}</strong>, потому что у неё есть
            подгруппы:<br />
            <strong>{subcategoriesList}</strong>
          </>
        );
        setIsDeletePopupOpen(false);
        setIsErrorPopupOpen(true);
        return;
      }

      dispatch(deleteCategory(groupToDelete));
      setIsDeletePopupOpen(false);
    }
  };

  const cancelDelete = () => {
    setIsDeletePopupOpen(false);
  };

  const startEdit = (id: number, currentName: string) => {
    setEditingGroupId(id);
    setNewName(currentName);
  };

  const saveEdit = async (id: number): Promise<void> => {
    if (newName.trim() !== '') {
      try {
        await dispatch(updateCategory({ id, name: newName })).unwrap();
        setEditingGroupId(null);
      } catch {
        setIsErrorPopupOpen(true);
      }
    }
  };

  const cancelEdit = () => {
    setEditingGroupId(null);
  };

  const closeErrorPopup = () => {
    setIsErrorPopupOpen(false);
    setErrorPopupMessage('');
  };

  const toggleGroup = (groupId: number) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  return (
    <div className={styles['group-manager']}>
      <h2>Список групп</h2>

      <ul>
        {groups.map((group) => (
          <li key={group.id} className={styles['group-item']}>
            <div className={styles['group-header']}>
              {/* Кнопка плюсика/минуса */}
              {Array.isArray(group.child) && group.child.length > 0 && (
                <button
                  className={styles['toggle-btn']}
                  onClick={() => toggleGroup(group.id)}
                >
                  {expandedGroups.includes(group.id) ? (
                    <MinusIcon color="#555" />
                  ) : (
                    <PlusIcon color="#555" />
                  )}
                </button>
              )}

              {/* Режим редактирования */}
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
                  {/* Название группы */}
                  <span className={styles['group-name']}>{group.name}</span>

                  {/* Кнопки действий */}
                  <div className={styles['group-actions']}>
                    <button
                      className={styles['edit-btn']}
                      onClick={() => startEdit(group.id, group.name)}
                    >
                      <EditIcon />
                    </button>
                    <button
                      className={styles['delete-btn']}
                      onClick={() => handleDelete(group.id)}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Подгруппы */}
            {expandedGroups.includes(group.id) &&
              Array.isArray(group.child) &&
              group.child.length > 0 && (
              <ul className={styles['subgroups']}>
                {group.child.map((subgroup) => (
                  <li key={subgroup.id} className={styles['subgroup-item']}>
                    <span className={styles['subgroup-name']}>{subgroup.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {isDeletePopupOpen && groupToDelete !== null && (
        <Popup
          isOpen={isDeletePopupOpen}
          message={
            <>
              Вы уверены, что хотите удалить группу{' '}
              <strong>{groups.find((group) => group.id === groupToDelete)?.name}</strong>?
            </>
          }
          onClose={cancelDelete}
          onConfirm={confirmDelete}
          type="confirmation"
        />
      )}

      {isErrorPopupOpen && (
        <Popup
          isOpen={isErrorPopupOpen}
          message={errorPopupMessage || error || 'Неизвестная ошибка'}
          onClose={closeErrorPopup}
          type="info"
        />
      )}
    </div>
  );
}

export default GroupsList;
