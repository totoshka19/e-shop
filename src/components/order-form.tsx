import React, { useState, useEffect } from 'react';

function OrderForm() {
  const [deliveryMethod, setDeliveryMethod] = useState('');

  useEffect(() => {
    const select = document.getElementById('delivery-method');
    if (select) {
      select.style.color = '#737373';
      const handleFocus = () => {
        if (!(select as HTMLSelectElement).value) {
          select.style.color = '#000';
        }
      };
      select.addEventListener('focus', handleFocus);
      return () => {
        select.removeEventListener('focus', handleFocus);
      };
    }
  }, []);

  const [postalCode, setPostalCode] = useState('');

  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setPostalCode(value.slice(0, 6));
  };

  // !TODO доделать валидацию

  return (
    <form className="order-form" action="/submit-order" method="POST">
      <div className="form__block">
        <div className="form-item">
          <label className="form-label" htmlFor="name">Ваше имя</label>
          <input className="form-control" id="name" type="text" maxLength={50} />
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
          <textarea className="form-control" id="message" rows={10} maxLength={500}></textarea>
        </div>
      </div>
      <div className="form__block">
        <div className="form-item">
          <label className="form-label" htmlFor="address">Адрес доставки*</label>
          <input className="form-control" id="address" type="text" maxLength={50} />
        </div>
        <div className="form-item">
          <label className="form-label" htmlFor="delivery-method">Метод доставки*</label>
          <div className="custom-select">
            <select
              className="form-control"
              id="delivery-method"
              value={deliveryMethod}
              onChange={(e) => setDeliveryMethod(e.target.value)}
              required
            >
              <option value="" disabled style={{ display: 'none' }}>
                Выберите метод доставки
              </option>
              <option value="post">Почта России</option>
              <option value="cdek">Сдэк</option>
              <option value="yadostavka">Яндекс доставка</option>
            </select>
            <span className="custom-select__arrow"></span>
          </div>
        </div>
        <div className="form-item">
          <label className="form-label" htmlFor="postal-code">Почтовый индекс*</label>
          <input
            className="form-control"
            id="postal-code"
            type="text"
            value={postalCode}
            onChange={handlePostalCodeChange}
            required
            pattern="\d{6}"
            maxLength={6}
          />
        </div>
        <div className="form-item">
          <label className="form-label" htmlFor="order-amount">Сумма заказа</label>
          <input
            className="form-control"
            id="order-amount"
            type="text"
            value="0.00"
            readOnly
          />
        </div>
        <div className="form-item form-item__wrapper">
          <button className="form-item__button" type="button">Оплатить</button>
          <p className="form-item__text">
            Нажимая на кнопку, вы соглашаетесь с <a className="form-item__link" href="#">Условиями обработки персональных данных</a>,
            а также с <a className="form-item__link" href="#">Условиями продажи</a>
          </p>
        </div>
      </div>
    </form>
  );
}

export default OrderForm;
