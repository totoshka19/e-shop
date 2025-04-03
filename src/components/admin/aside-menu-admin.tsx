import React, {useState} from 'react';
import styles from '../../styles/admin/aside-menu-admin.module.scss';

function AsideMenuAdmin() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className={styles['aside-menu']}>
      <nav>
        <ul>
          <li onClick={toggleDropdown} className={`${styles['dropdown-header']} ${styles['menu-title']}`}>
            Управление товарами
          </li>
          {isOpen && (
            <ul className={styles['dropdown-list']}>
              <li>Группы</li>
              <li>Товары</li>
              <li>Отзывы</li>
            </ul>
          )}
          <li className={styles['menu-title']}>Управление заказами</li>
          <li className={styles['menu-title']}>Управление сайтом</li>
        </ul>
      </nav>
    </aside>
  );
}

export default AsideMenuAdmin;
