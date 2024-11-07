import { Helmet } from 'react-helmet-async';
import Layout from '../components/layout';
import CatalogCards from '../components/catalog-cards';

/*!TODO поменять на картинку без надписи и доделать верстку баннера*/
function CatalogPage() {
  return (
    <div className="wrapper">
      <Helmet>
        <title>E-shop</title>
      </Helmet>

      <Layout>
        <main>
          <div className="page-content">
            <section className="banner">
              <div className="container">
                <img className="banner__img" src="/images/banner.jpg" alt="Баннер" />
              </div>
            </section>
            <section className="catalog">
              <div className="container">
                <CatalogCards />
              </div>
            </section>
          </div>
        </main>
      </Layout>
    </div>
  );
}

export default CatalogPage;
