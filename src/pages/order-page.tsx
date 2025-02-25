import { Helmet } from 'react-helmet-async';
import Layout from '../components/layout';
import ReturnBtn from '../components/return-btn';
import Breadcrumbs from '../components/breadcrumbs';
import { AppRoute } from '../conts';
import AsideInfo from '../components/aside-info';

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
                <form className="order-form" action="/submit-order" method="POST">
                  <div className="form__block">
                    <div className="form-item">
                      <label className="form-label" htmlFor="name">Ваше имя</label>
                      <input className="form-control" id="name" type="text" />
                    </div>
                    <div className="form-item">
                      <label className="form-label" htmlFor="email">Ваш e-mail*</label>
                      <input className="form-control" id="email" type="email" required />
                    </div>
                    <div className="form-item">
                      <label className="form-label" htmlFor="phone">Ваш номер телефона*</label>
                      <input className="form-control" id="phone" type="tel" placeholder="+7 (___)___ - __ __" required />
                    </div>
                    <div className="form-item">
                      <label className="form-label" htmlFor="message">Дополнительно
                        <p>Задай вопрос магазину</p>
                      </label>
                      <textarea className="form-control" id="message" rows="10"></textarea>
                    </div>
                  </div>
                  <div className="form__block">
                    <div className="form-item">
                      <label className="form-label" htmlFor="address">Адрес доставки*</label>
                      <input className="form-control" id="address" type="text" required />
                    </div>
                    <div className="form-item">
                      <label className="form-label" htmlFor="delivery-method">Метод доставки*</label>
                      <select className="form-control" id="delivery-method" required>
                        <option value="" disabled selected>Выберите метод доставки</option>
                        <option value="post">Почта России</option>
                        <option value="cdek">Сдэк</option>
                        <option value="yadostavka">Яндекс доставка</option>
                      </select>
                    </div>
                    <div className="form-item">
                      <label className="form-label" htmlFor="postal-code">Почтовый индекс*</label>
                      <input className="form-control" id="postal-code" type="number" required />
                    </div>
                    <div className="form-item">
                      <label className="form-label" htmlFor="order-amount">Сумма заказа</label>
                      <input className="form-control" id="order-amount" type="number" />
                    </div>
                    <div className="form-item">
                      <button type="button">Оплатить</button>
                      <p>
                        Нажимая на кнопку, вы соглашаетесь с <a href="#">Условиями обработки персональных данных</a>,
                        а также с <a href="#">Условиями продажи</a>.
                      </p>
                    </div>
                  </div>
                </form>
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
