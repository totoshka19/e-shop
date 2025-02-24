import { BaseProduct } from '../types/product';
import { calculateTotalPrice, formatPrice } from '../utils';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../store/cart-slice';
import { AppDispatch } from '../store/store';
import { AppRoute } from '../conts';

type CartItemProps = {
  item: BaseProduct;
  quantity: number;
}

function CartItem({ item, quantity }: CartItemProps) {
  const dispatch = useDispatch<AppDispatch>();
  const isInStock = item.inStock;
  const itemClass = isInStock ? 'cart-item' : 'cart-out-of-stock-item';
  const quantityClass = isInStock ? 'cart-item__quantity' : 'cart-out-of-stock-item__quantity';
  const removeClass = isInStock ? 'cart-item__remove' : 'cart-out-of-stock-item__remove';

  const totalPrice = calculateTotalPrice(item.price, quantity).toFixed(2);

  const handleIncreaseQuantity = () => {
    dispatch(addToCart({ product: item, quantity: 1 }));
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      dispatch(addToCart({ product: item, quantity: -1 }));
    } else {
      dispatch(removeFromCart(item.id));
    }
  };

  const handleRemoveItem = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <div className={itemClass}>
      <img className={`${itemClass}__img`} src={item.previewImg} alt={item.name} />
      <Link className={`${itemClass}__link`} to={`/product/${item.id}`}>
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
          <button className={`${quantityClass}-btn-minus`} onClick={handleDecreaseQuantity}>&mdash;</button>
          <span className={`${quantityClass}-value`}>{quantity}</span>
          <button className={`${quantityClass}-btn-plus`} onClick={handleIncreaseQuantity}>+</button>
        </div>
      </div>
      <p className={`${itemClass}__total`}>
        Стоимость<br /><span>{totalPrice}</span>
      </p>
      <div className={removeClass}>
        <p className={`${removeClass}-title`}>Удалить</p>
        <button className={`${removeClass}-btn`} onClick={handleRemoveItem}>&mdash;</button>
      </div>
      <Link to={AppRoute.Order} className={`${itemClass}__buy`}>Купить</Link>
    </div>
  );
}

export default CartItem;
