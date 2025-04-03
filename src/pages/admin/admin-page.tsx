import { useDispatch } from 'react-redux';
import { login } from '../../store/admin/auth-slice';
import LoginForm from '../../components/admin/login-form';
import { AppDispatch } from '../../store/store';
import { useAuth } from '../../hooks/use-auth';
import { Helmet } from 'react-helmet-async';
import Layout from '../../components/public/layout';
import LayoutAdmin from '../../components/admin/layout-admin';
import AsideMenuAdmin from '../../components/admin/aside-menu-admin';
import styles from '../../styles/admin/admin-page.module.scss';

function AdminPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { token, status, error } = useAuth();

  const handleLogin = (email: string, password: string) => {
    dispatch(login({ email, password })).unwrap();
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
          <title>Авторизация</title>
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
          <title>Административная панель</title>
        </Helmet>

        <LayoutAdmin>
          <div className={styles['content-wrapper']}>
            <AsideMenuAdmin />
            <main>
              <div className="container">
                <h1>Административная панель</h1>
                <p>Вы успешно вошли.</p>
              </div>
            </main>
          </div>
        </LayoutAdmin>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <Helmet>
        <title>Авторизация</title>
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
