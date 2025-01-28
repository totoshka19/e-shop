import React from 'react';
import { Product } from '../types/product';
import { calculateTotalPrice, formatPrice } from '../utils';
import { Link } from 'react-router-dom';

type CartItemProps = {
  item: Product;
  quantity: number;
}

function CartItem({ item, quantity }: CartItemProps) {
  const isInStock = item.inStock;
  const itemClass = isInStock ? 'cart-item' : 'cart-out-of-stock-item';
  const quantityClass = isInStock ? 'cart-item__quantity' : 'cart-out-of-stock-item__quantity';
  const removeClass = isInStock ? 'cart-item__remove' : 'cart-out-of-stock-item__remove';

  const totalPrice = calculateTotalPrice(item.price, quantity).toFixed(2);

  return (
    <div className={itemClass}>
      <img className={`${itemClass}__img`} src={item.previewImg} alt={item.name} />
      <Link to={`/product/${item.id}`}>
        <h3 className={`${itemClass}__name`}>{item.name}</h3>
      </Link>
      {isInStock && (
        <p className={`${itemClass}__sku`}>
          Артикул товара<br /><span>{item.sku}</span>
        </p>
      )}
      <p className={`${itemClass}__price`}>
        Цена<br /><span>{formatPrice(item.price)}</span>
      </p>
      <div className={quantityClass}>
        <p className={`${quantityClass}-title`}>Количество<br /></p>
        <div className={`${quantityClass}-wrapper`}>
          <button className={`${quantityClass}-btn-minus`}>&mdash;</button>
          <span className={`${quantityClass}-value`}>{quantity}</span>
          <button className={`${quantityClass}-btn-plus`}>+</button>
        </div>
      </div>
      <p className={`${itemClass}__total`}>
        Стоимость<br /><span>{totalPrice}</span>
      </p>
      <div className={removeClass}>
        <p className={`${removeClass}-title`}>Удалить</p>
        <button className={`${removeClass}-btn`}>&mdash;</button>
      </div>
      <button className={`${itemClass}__buy`}>Купить</button>
    </div>
  );
}

export default CartItem;
