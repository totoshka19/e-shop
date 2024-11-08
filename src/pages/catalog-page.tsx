import { Helmet } from 'react-helmet-async';
import Layout from '../components/layout';
import CatalogCards from '../components/catalog-cards';

function CatalogPage() {
  return (
    <div className="wrapper">
      <Helmet>
        <title>E-shop</title>
      </Helmet>

      <Layout>
        <main>
          <section className="banner">
            <div className="container">
              <div className="banner__inner">
                <h1 className="banner__title">Мы&nbsp;на&nbsp;маркетах</h1>
                <h2 className="banner__subtitle">Наши товары для Вас на&nbsp;любой удобной площадке</h2>
              </div>
            </div>
          </section>
          <section className="catalog">
            <div className="container">
              <CatalogCards />
            </div>
          </section>
        </main>
      </Layout>
    </div>
  );
}

export default CatalogPage;
