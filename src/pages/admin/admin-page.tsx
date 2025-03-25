import { useDispatch } from 'react-redux';
import { login, logout } from '../../store/auth-slice';
import LoginForm from '../../components/admin/login-form';
import { AppDispatch } from '../../store/store';
import { useAuth } from '../../hooks/use-auth';

function AdminPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { token, status, error } = useAuth();

  const handleLogin = (email: string, password: string) => {
    dispatch(login({ email, password })).unwrap();
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (error) {
    return (
      <div className="error-message">
        <p>Произошла ошибка: {error}</p>
        <button onClick={() => handleLogin('', '')}>Попробовать снова</button>
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
