import { Helmet } from 'react-helmet-async';
import Layout from '../components/layout';
import CatalogCards from '../components/catalog-cards';

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
                {/*!TODO поменять на картинку без надписи и доделать верстку баннера*/}
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
    </>
  );
}

export default CatalogPage;
