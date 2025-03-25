import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../store/auth-slice';
import LoginForm from '../../components/admin/login-form';
import { AppDispatch, RootState } from '../../store/store';

function AdminPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { token, status, error } = useSelector((state: RootState) => state.auth);

  const handleLogin = async (email: string, password: string) => {
    try {
      await dispatch(login({ email, password })).unwrap();
    } catch {
      // Убран alert, вместо этого показываем ошибку в интерфейсе
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (error) {
    // Показываем ошибку в интерфейсе
    return (
      <div className="error-message">
        <p>Произошла ошибка: {error}</p>
        <button onClick={handleLogin}>Попробовать снова</button>
      </div>
    );
  }

  if (!token && status !== 'loading') {
    return <LoginForm onLogin={handleLogin} />;
  }

  if (status === 'loading') {
    return <div>Авторизация...</div>;
  }

  return (
    <div>
      <h1>Административная панель</h1>
      <p>Вы успешно вошли.</p>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
}

export default AdminPage;
