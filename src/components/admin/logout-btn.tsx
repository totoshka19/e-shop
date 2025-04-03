import { useDispatch } from 'react-redux';
import { logout } from '../../store/admin/auth-slice';
import { AppDispatch } from '../../store/store';
import styles from '../../styles/admin/logout-btn.module.scss';

function LogoutBtn() {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={styles['logout-btn']}
    >
      Выйти
    </button>
  );
}

export default LogoutBtn;
