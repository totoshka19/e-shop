import React from 'react';
import { useSelector } from 'react-redux';
import {RootState} from '../../store/store';

function GroupsList() {
  const groups = useSelector((state: RootState) => state.categories.categories); // Категории = Группы
  const status = useSelector((state: RootState) => state.categories.status);
  const error = useSelector((state: RootState) => state.categories.error);

  if (status === 'loading') {
    return <p>Загрузка групп...</p>;
  }

  if (status === 'failed') {
    return <p>Ошибка: {error}</p>;
  }

  return (
    <div>
      <h3>Список групп</h3>
      <ul>
        {groups.map((group) => (
          <li key={group.id}>
            {group.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupsList;
