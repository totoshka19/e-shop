import { useEffect, useState } from 'react';
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
import GroupsList from '../../components/admin/groups-list';
import ProductsList from '../../components/admin/products-list';
import Settings from '../../components/admin/Settings';
import styles from '../../styles/admin/admin-page.module.scss';

function AdminPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { token, status, error } = useAuth();
  const [currentSection, setCurrentSection] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setCurrentSection(null);
    }
  }, [token]);

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
            <AsideMenuAdmin
              setCurrentSection={setCurrentSection}
              currentSection={currentSection}
            />
            <main>
              {!currentSection && (
                <div className={styles['welcome-screen']}>
                  <h2>Добро пожаловать в административную панель</h2>
                  <p>Выберите раздел для работы</p>
                </div>
              )}

              {currentSection === 'groups' && (
                <div id="groups">
                  <div className={styles['content']}>
                    <GroupManager />
                    <SubgroupManager />
                  </div>
                  <div className={styles['content']}>
                    <GroupsList />
                  </div>
                </div>
              )}

              {currentSection === 'products' && (
                <div id="products">
                  <div className={styles['content']}>
                    <ProductsList />
                  </div>
                </div>
              )}

              {currentSection === 'reviews' && (
                <div id="reviews">
                  <div className={styles['content']}>
                    Отзывы
                  </div>
                </div>
              )}

              {currentSection === 'orders' && (
                <div id="orders">
                  <div className={styles['content']}>
                    Управление заказами
                  </div>
                </div>
              )}

              {currentSection === 'site' && (
                <div id="site">
                  <div className={styles['content']}>
                    <Settings />
                  </div>
                </div>
              )}
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
          <div className="container"></div>
        </main>
      </Layout>
    </div>
  );
}

export default AdminPage;
