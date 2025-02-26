import { Helmet } from 'react-helmet-async';
import Layout from '../components/layout';
import ReturnBtn from '../components/return-btn';
import Breadcrumbs from '../components/breadcrumbs';
import { AppRoute } from '../conts';
import AsideInfo from '../components/aside-info';
import OrderForm from '../components/order-form';

function OrderPage() {
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

          <section className="order">
            <div className="container">
              <main className="order__main-content">
                <h1 className="order-title">Оставить заявку</h1>
                <div className="order__items">
                  <div className="order-item">
                    <img className="order-item__img" src="" alt="" />
                    <a className="order-item__link">
                      <h3 className="order-item__name">Корпус для жесткого диска HDD SSD (2.5&rdquo;, USB 3.0, SATA)</h3>
                    </a>
                    <p className="order-item__sku">
                      Артикул товара<br /><span>163443548</span>
                    </p>
                  </div>
                  <div className="order-item">
                    <img className="order-item__img" src="" alt="" />
                    <a className="order-item__link">
                      <h3 className="order-item__name">Корпус для жесткого диска HDD SSD (2.5&rdquo;, USB 3.0, SATA)</h3>
                    </a>
                    <p className="order-item__sku">
                      Артикул товара<br /><span>163443548</span>
                    </p>
                  </div>
                  <div className="order-item">
                    <img className="order-item__img" src="" alt="" />
                    <a className="order-item__link">
                      <h3 className="order-item__name">Корпус для жесткого диска HDD SSD (2.5&rdquo;, USB 3.0, SATA)</h3>
                    </a>
                    <p className="order-item__sku">
                      Артикул товара<br /><span>163443548</span>
                    </p>
                  </div>
                </div>

                <OrderForm />
              </main>

              <AsideInfo classPrefix="order" />
            </div>
          </section>
        </main>
      </Layout>
    </div>
  );
}

export default OrderPage;
