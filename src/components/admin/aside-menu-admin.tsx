import { useState } from 'react';
import styles from '../../styles/admin/aside-menu-admin.module.scss';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import {fetchCategories} from '../../store/admin/caregories-thunks';

type AsideMenuAdminProps = {
  setCurrentSection: (section: string | null) => void;
  currentSection: string | null;
};

function AsideMenuAdmin({ setCurrentSection, currentSection }: AsideMenuAdminProps) {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSectionClick = (section: string) => {
    setCurrentSection(section);

    if (section === 'groups') {
      dispatch(fetchCategories());
    }
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
              <li
                onClick={() => handleSectionClick('groups')}
                className={currentSection === 'groups' ? `${styles['active']}` : ''}
              >
                Группы
              </li>
              <li
                onClick={() => handleSectionClick('products')}
                className={currentSection === 'products' ? `${styles['active']}` : ''}
              >
                Товары
              </li>
              <li
                onClick={() => handleSectionClick('reviews')}
                className={currentSection === 'reviews' ? `${styles['active']}` : ''}
              >
                Отзывы
              </li>
            </ul>
          )}
          <li
            onClick={() => handleSectionClick('orders')}
            className={`${styles['menu-title']} ${
              currentSection === 'orders' ? `${styles['active']}` : ''
            }`}
          >
            Управление заказами
          </li>
          <li
            onClick={() => handleSectionClick('site')}
            className={`${styles['menu-title']} ${
              currentSection === 'site' ? `${styles['active']}` : ''
            }`}
          >
            Управление сайтом
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default AsideMenuAdmin;
