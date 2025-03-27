import { useDispatch } from 'react-redux';
import { login, logout } from '../../store/auth-slice';
import LoginForm from '../../components/admin/login-form';
import { AppDispatch } from '../../store/store';
import { useAuth } from '../../hooks/use-auth';
import { Helmet } from 'react-helmet-async';
import Layout from '../../components/layout';

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
    return (
      <div className="wrapper">
        <Helmet>
          <title>Авторизация - E-shop</title>
        </Helmet>

        <Layout>
          <main>
            <div className="container">
              <LoginForm onLogin={handleLogin} />
            </div>
          </main>
        </Layout>
      </div>
    );
  }

  if (token) {
    return (
      <div className="wrapper">
        <Helmet>
          <title>Административная панель - E-shop</title>
        </Helmet>

        <Layout>
          <main>
            <div className="container">
              <h1>Административная панель</h1>
              <p>Вы успешно вошли.</p>
              <button onClick={handleLogout}>Выйти</button>
            </div>
          </main>
        </Layout>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <Helmet>
        <title>Авторизация - E-shop</title>
      </Helmet>

      <Layout>
        <main>
          <div className="container">
            <div>Авторизация...</div>
          </div>
        </main>
      </Layout>
    </div>
  );
}

export default AdminPage;
