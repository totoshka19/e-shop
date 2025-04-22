import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import {deleteCategory, fetchCategories, updateCategory} from '../../store/admin/thunks';
import styles from '../../styles/admin/group-manager.module.scss';
import { useState, useEffect } from 'react';
import { CheckIcon, CrossIcon, EditIcon, DeleteIcon } from './icons';
import Popup from './popup';

function ProductsList() {
  const dispatch = useDispatch<AppDispatch>();
  const groups = useSelector((state: RootState) => state.categories.categories); // Категории = Группы
  const error = useSelector((state: RootState) => state.categories.error);
  const [editingGroupId, setEditingGroupId] = useState<number | null>(null);
  const [newName, setNewName] = useState<string>('');
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<number | null>(null);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    setGroupToDelete(id);
    setIsDeletePopupOpen(true);
  };

  const confirmDelete = () => {
    if (groupToDelete !== null) {
      dispatch(deleteCategory(groupToDelete));
    }
    setIsDeletePopupOpen(false);
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
  };

  return (
    <div className={styles['group-manager']}>
      <h2>Список товаров</h2>

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
              <div className={styles['popup-actions']}>
                <button onClick={confirmDelete}>Да</button>
                <button onClick={cancelDelete}>Нет</button>
              </div>
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
          message={
            <>
              Произошла ошибка: <strong>{error || 'Неизвестная ошибка'}</strong>
            </>
          }
          onClose={closeErrorPopup}
          type="info"
        />
      )}
    </div>
  );
}

export default ProductsList;
