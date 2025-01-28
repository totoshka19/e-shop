import { Helmet } from 'react-helmet-async';
import Layout from '../components/layout';
import ReturnBtn from '../components/return-btn';
import Breadcrumbs from '../components/breadcrumbs';
import { AppRoute } from '../conts';

function BasketPage() {
  return (
    <div className="wrapper">
      <Helmet>
        <title>Форма заявки - E-shop</title>
      </Helmet>

      <Layout>
        <main>
          <ReturnBtn isVisible />
          <Breadcrumbs
            crumbs={[
              { name: 'Главная', path: AppRoute.Catalog },
              { name: 'Корзина', path: AppRoute.Basket },
              { name: 'Форма заявки', path: AppRoute.Basket },
            ]}
          />

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
