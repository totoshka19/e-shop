
// src/pages/admin/admin-page.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../store/auth-slice';
import LoginForm from '../../components/admin/login-form';

function AdminPage() {
  const dispatch = useDispatch();
  const { token, status, error } = useSelector((state: any) => state.auth);

  // Логируем текущее состояние при каждом рендере
  useEffect(() => {
    console.log('Текущее состояние auth:', { token, status, error });
  }, [token, status, error]);

  const handleLogin = async (email: string, password: string) => {
    try {
      console.log('Попытка авторизации с логином и паролем:', { email, password });
      await dispatch(login({ email, password })).unwrap(); // Выполняем thunk для авторизации
      console.log('Авторизация завершена успешно');
    } catch (err) {
      console.error('Ошибка входа:', err);
      alert('Неверный логин или пароль');
    }
  };

  const handleLogout = () => {
    dispatch(logout()); // Выполняем действие logout
  };

  if (!token && status !== 'loading') {
    // Если токена нет, показываем форму входа
    console.log('Токен отсутствует, показываем форму входа');
    return <LoginForm onLogin={handleLogin} />;
  }

  if (status === 'loading') {
    // Показываем индикатор загрузки при отправке запроса
    console.log('Статус: loading, показываем индикатор загрузки');
    return <div>Авторизация...</div>;
  }

  // Если токен есть, показываем содержимое админки
  console.log('Токен существует, показываем админку');
  return (
    <div>
      <h1>Административная панель</h1>
      <p>Вы успешно вошли.</p>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
}

export default AdminPage;
