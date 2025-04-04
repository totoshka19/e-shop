import {useState} from 'react';
import styles from '../../styles/admin/aside-menu-admin.module.scss';

type AsideMenuAdminProps = {
  setCurrentSection: (section: string | null) => void;
};

function AsideMenuAdmin({ setCurrentSection }: AsideMenuAdminProps) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSectionClick = (section: string) => {
    setCurrentSection(section);
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
              <li onClick={() => handleSectionClick('groups')}>Группы</li>
              <li onClick={() => handleSectionClick('products')}>Товары</li>
              <li onClick={() => handleSectionClick('reviews')}>Отзывы</li>
            </ul>
          )}
          <li onClick={() => handleSectionClick('orders')} className={styles['menu-title']}>Управление заказами</li>
          <li onClick={() => handleSectionClick('site')} className={styles['menu-title']}>Управление сайтом</li>
        </ul>
      </nav>
    </aside>
  );
}

export default AsideMenuAdmin;
