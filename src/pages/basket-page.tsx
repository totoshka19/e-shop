import { Helmet } from 'react-helmet-async';
import Layout from '../components/layout';

function BasketPage() {
  return (
    <>
      <Helmet>
        <title>Корзина - E-shop</title>
      </Helmet>

      <Layout>
        <main>
          <div className="page-content">
            <section className="cart">
              <div className="container">
                <h1 className="title">Корзина заказов</h1>
              </div>
            </section>
          </div>
        </main>
      </Layout>
    </>
  );
}

export default BasketPage;
