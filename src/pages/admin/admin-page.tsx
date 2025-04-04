import { useDispatch } from 'react-redux';
import { login, resetError } from '../../store/admin/auth-slice';
import LoginForm from '../../components/admin/login-form';
import { AppDispatch } from '../../store/store';
import { useAuth } from '../../hooks/use-auth';
import { Helmet } from 'react-helmet-async';
import Layout from '../../components/public/layout';
import LayoutAdmin from '../../components/admin/layout-admin';
import AsideMenuAdmin from '../../components/admin/aside-menu-admin';
import GroupManager from '../../components/admin/group-manager';
import SubgroupManager from '../../components/admin/subgroup-manager';
import styles from '../../styles/admin/admin-page.module.scss';

function AdminPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { token, status, error } = useAuth();

  const handleLogin = (email: string, password: string) => {
    dispatch(login({ email, password })).unwrap();
  };

  if (error) {
    return (
      <div className="wrapper">
        <Helmet>
          <title>Авторизация</title>
        </Helmet>

        <Layout>
          <main>
            <div className="container">
              <div className={styles['error-message']}>
                <p>{error}</p>
                <button onClick={() => dispatch(resetError())}>Попробовать снова</button>
              </div>
            </div>
          </main>
        </Layout>
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
              <div className={styles['content']}>
                <GroupManager />
                <SubgroupManager />
              </div>
              <div className={styles['content']}>
                <GroupManager />
                <SubgroupManager />
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
          </div>
        </main>
      </Layout>
    </div>
  );
}

export default AdminPage;
