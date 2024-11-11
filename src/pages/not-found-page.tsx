import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Layout from '../components/layout';

function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Страница не найдена - E-shop</title>
      </Helmet>

      <div className="not-found-page">
        <Layout>
          <div className="container">
            <h1 className="not-found-page__title">Страница не найдена</h1>
            <Link className="not-found-page__link" to="/">Вернуться на главную страницу</Link>
          </div>
        </Layout>
      </div>

    </>
  );
}

export default NotFoundPage;
