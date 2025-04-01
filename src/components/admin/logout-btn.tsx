import { useDispatch } from 'react-redux';
import { logout } from '../../store/admin/auth-slice';
import { AppDispatch } from '../../store/store';

function LogoutBtn({ className }: { className?: string }) {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={`btn btn-danger logout-btn ${className || ''}`}
    >
      Выйти
    </button>
  );
}

export default LogoutBtn;
