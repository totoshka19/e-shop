import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import {
  deleteCategory,
  fetchCategories,
  updateCategory,
} from '../../store/admin/thunks';
import styles from '../../styles/admin/group-manager.module.scss';
import React, {useState, useEffect, useRef} from 'react';
import { CheckIcon, CrossIcon, EditIcon, DeleteIcon, PlusIcon, MinusIcon } from './icons'; // Импортируем новые иконки
import Popup from './popup';
import {Category} from '../../types/public/product';
import {useAutoResizeTextArea} from '../../hooks/use-auto-resize-text-area';

function GroupsList() {
  const dispatch = useDispatch<AppDispatch>();
  const groups = useSelector((state: RootState) => state.categories.categories); // Категории = Группы
  const error = useSelector((state: RootState) => state.categories.error);
  const [editingGroupId, setEditingGroupId] = useState<number | null>(null);
  const [newGroupName, setNewGroupName] = useState<string>('');
  const [editingSubgroupId, setEditingSubgroupId] = useState<number | null>(null);
  const [newSubgroupName, setNewSubgroupName] = useState<string>('');
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<number | null>(null);
  const [isSubgroupDeletePopupOpen, setIsSubgroupDeletePopupOpen] = useState(false);
  const [subgroupToDelete, setSubgroupToDelete] = useState<Category | null>(null);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [errorPopupMessage, setErrorPopupMessage] = useState<React.ReactNode>('');
  const [expandedGroups, setExpandedGroups] = useState<number[]>([]);

  const groupTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const subgroupTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  useAutoResizeTextArea(groupTextareaRef, newGroupName);
  useAutoResizeTextArea(subgroupTextareaRef, newSubgroupName);

  useEffect(() => {
    if (editingGroupId !== null && groupTextareaRef.current) {
      const el = groupTextareaRef.current;
      if ('focus' in el) {
        el.focus();
      }
      if ('setSelectionRange' in el) {
        el.setSelectionRange(el.value.length, el.value.length);
      }
      if ('style' in el) {
        el.style.height = 'auto';
      }
      if ('style' in el) {
        el.style.height = `${el.scrollHeight}px`;
      }
    }
  }, [editingGroupId]);

  useEffect(() => {
    if (editingSubgroupId !== null && subgroupTextareaRef.current) {
      const el = subgroupTextareaRef.current;
      if ('focus' in el) {
        el.focus();
      }
      if ('setSelectionRange' in el) {
        el.setSelectionRange(el.value.length, el.value.length);
      }
      if ('style' in el) {
        el.style.height = 'auto';
      }
      if ('style' in el) {
        el.style.height = `${el.scrollHeight}px`;
      }
    }
  }, [editingSubgroupId]);

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

  const startEditGroup = (id: number, currentName: string) => {
    setEditingGroupId(id);
    setNewGroupName(currentName);
  };

  const saveEditGroup = async (id: number): Promise<void> => {
    if (newGroupName.trim() !== '') {
      try {
        const currentExpandedGroups = [...expandedGroups]; // Сохраняем копию
        await dispatch(updateCategory({ id, name: newGroupName })).unwrap();
        setEditingGroupId(null);
        setExpandedGroups(currentExpandedGroups);
      } catch {
        setIsErrorPopupOpen(true);
      }
    }
  };

  const cancelEditGroup = () => {
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

  const startEditSubgroup = (id: number, currentName: string) => {
    setEditingSubgroupId(id); // Устанавливаем ID редактируемой подгруппы
    setNewSubgroupName(currentName); // Устанавливаем текущее имя подгруппы
  };

  const saveEditSubgroup = async (subgroup: Category): Promise<void> => {
    if (newSubgroupName.trim() !== '') {
      try {
        const currentExpandedGroups = expandedGroups; // Сохраняем текущее состояние
        await dispatch(
          updateCategory({
            id: subgroup.id,
            name: newSubgroupName,
            // eslint-disable-next-line camelcase
            parent_category_id: subgroup.parent_category_id,
          })
        ).unwrap();
        setEditingSubgroupId(null); // Выходим из режима редактирования
        setExpandedGroups(currentExpandedGroups); // Восстанавливаем состояние
      } catch {
        setIsErrorPopupOpen(true); // Показываем ошибку при неудаче
      }
    }
  };

  const cancelEditSubgroup = () => {
    setEditingSubgroupId(null); // Выходим из режима редактирования
  };

  const handleDeleteSubgroup = (subgroup: Category) => {
    setSubgroupToDelete(subgroup);
    setIsSubgroupDeletePopupOpen(true);
  };

  const confirmDeleteSubgroup = () => {
    if (subgroupToDelete !== null) {
      dispatch(deleteCategory(subgroupToDelete.id));
      setIsSubgroupDeletePopupOpen(false);
    }
  };

  const cancelDeleteSubgroup = () => {
    setIsSubgroupDeletePopupOpen(false);
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
                  <textarea
                    ref={groupTextareaRef}
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    autoFocus
                    className={styles['edit-textarea']}
                  />
                  <button
                    onClick={() => void saveEditGroup(group.id)}
                    className={styles['save-btn']}
                  >
                    <CheckIcon />
                  </button>
                  <button onClick={cancelEditGroup} className={styles['cancel-btn']}>
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
                      onClick={() => startEditGroup(group.id, group.name)}
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
                    {/* Режим редактирования подгруппы */}
                    {editingSubgroupId === subgroup.id ? (
                      <div className={styles['edit-mode']}>
                        <textarea
                          ref={subgroupTextareaRef}
                          value={newSubgroupName}
                          onChange={(e) => setNewSubgroupName(e.target.value)}
                          autoFocus
                          className={styles['edit-textarea']}
                        />
                        <button
                          onClick={() => void saveEditSubgroup(subgroup)}
                          className={styles['save-btn']}
                        >
                          <CheckIcon />
                        </button>
                        <button onClick={cancelEditSubgroup} className={styles['cancel-btn']}>
                          <CrossIcon />
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className={styles['subgroup-name']}>{subgroup.name}</span>
                        <div className={styles['group-actions']}>
                          <button
                            className={styles['edit-btn']}
                            onClick={() => startEditSubgroup(subgroup.id, subgroup.name)}
                          >
                            <EditIcon />
                          </button>
                          <button
                            className={styles['delete-btn']}
                            onClick={() => void handleDeleteSubgroup(subgroup)}
                          >
                            <DeleteIcon />
                          </button>
                        </div>
                      </>
                    )}
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

      {isSubgroupDeletePopupOpen && subgroupToDelete !== null && (
        <Popup
          isOpen={isSubgroupDeletePopupOpen}
          message={
            <>
              Вы уверены, что хотите удалить подгруппу{' '}
              <strong>{subgroupToDelete.name}</strong>?
            </>
          }
          onClose={cancelDeleteSubgroup}
          onConfirm={confirmDeleteSubgroup}
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
