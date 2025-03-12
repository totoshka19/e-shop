import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Layout from '../components/layout';
import ReturnBtn from '../components/return-btn';
import Breadcrumbs from '../components/breadcrumbs';
import { AppRoute } from '../consts';
import CartList from '../components/cart-list';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { calculateTotalPrice } from '../utils';
import AsideInfo from '../components/aside-info';

function BasketPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalAmount = cartItems.reduce((total, item) =>
    total + calculateTotalPrice(item.product.price, item.quantity)
  , 0).toFixed(2);

  return (
    <div className="wrapper">
      <Helmet>
        <title>Корзина - E-shop</title>
      </Helmet>

      <Layout>
        <main>
          <ReturnBtn isVisible />
          <Breadcrumbs
            crumbs={[
              { name: 'Главная', path: AppRoute.Catalog },
              { name: 'Корзина', path: AppRoute.Basket },
            ]}
          />

          <section className="cart">
            <div className="container">
              <main className="cart__main-content">
                <h1 className="cart-title">
                  Ваша корзина {cartItems.length === 0 ? 'пуста' : ''}
                </h1>

                {cartItems.length === 0 ? null : (
                  <>
                    <CartList items={cartItems} isInStock />
                    <div className="cart__summary">
                      <p className="cart__summary-total"><span>Итого</span> {totalAmount}</p>
                      <Link to={AppRoute.Order} className="cart__summary-order-btn">Оформить заказ</Link>
                    </div>
                  </>
                )}

                {/* Условный рендеринг блока "Товара нет на складе" */}
                {cartItems.length > 0 && (
                  <div className="cart__out-of-stock">
                    <h2 className="cart__out-of-stock-title">Товара нет на складе</h2>
                    <div className="cart-out-of-stock__items">
                      <div className="cart-out-of-stock-item">
                        <img className="cart-out-of-stock-item__img" src="" alt=""/>
                        <a className="cart-out-of-stock-item__link" href="#">
                          <h3 className="cart-out-of-stock-item__name">Корпус для жесткого диска HDD SSD (2.5&rsquo;, USB 3.0, SATA)</h3>
                        </a>
                        <p className="cart-out-of-stock-item__price">Цена<br /><span>1177.00</span></p>
                        <div className="cart-out-of-stock-item__quantity">
                          <p className="cart-out-of-stock-item__quantity-title">Количество<br /></p>
                          <div className="cart-out-of-stock-item__quantity-wrapper">
                            <button className="cart-out-of-stock-item__quantity-btn-minus">&mdash;</button>
                            <span className="cart-out-of-stock-item__quantity-value">2</span>
                            <button className="cart-out-of-stock-item__quantity-btn-plus">+</button>
                          </div>
                        </div>
                        <p className="cart-out-of-stock-item__total">Стоимость<br /><span>1177.00</span></p>
                        <div className="cart-out-of-stock-item__remove">
                          <p className="cart-out-of-stock-item__remove-title">Удалить</p>
                          <button className="cart-out-of-stock-item__remove-btn">&mdash;</button>
                        </div>
                        <button className="cart-out-of-stock-item__buy">Купить</button>
                      </div>
                    </div>
                  </div>
                )}
              </main>

              <AsideInfo classPrefix="cart" />
            </div>
          </section>
        </main>
      </Layout>
    </div>
  );
}

export default BasketPage;
