import { Helmet } from 'react-helmet-async';
import Layout from '../components/layout';

function CatalogPage() {
  return (
    <>
      <Helmet>
        <title>E-shop</title>
      </Helmet>

      <Layout>
        <main>
          <div className="page-content">
            <section className="banner">
              <div className="container">
                <h2 className="title">Баннер</h2>
              </div>
            </section>
            <section className="catalog">
              <div className="container">
                <h1 className="title">Карточки товаров</h1>
              </div>
            </section>
          </div>
        </main>
      </Layout>
    </>
  );
}

export default CatalogPage;
