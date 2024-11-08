import { Helmet } from 'react-helmet-async';
import Layout from '../components/layout';

function BasketPage() {
  return (
    <div className="wrapper">
      <Helmet>
        <title>Корзина - E-shop</title>
      </Helmet>

      <Layout>
        <main>
          <section className="cart">
            <div className="container">
              <h1 className="title">Корзина заказов</h1>
            </div>
          </section>
        </main>
      </Layout>
    </div>
  );
}

export default BasketPage;
