import { Link } from 'react-router-dom';
import { AppRoute } from '../conts';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

function CartBtn() {
  const cartItemsCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <Link className="cart-btn" to={AppRoute.Basket} aria-label="Переход в корзину">
      <img className="cart__img" src="/images/cart-icon.svg" alt="Иконка тележки" width="30" height="25" />
      {cartItemsCount > 0 && (
        <span className="cart-btn__count">{cartItemsCount}</span>
      )}
    </Link>
  );
}

export default CartBtn;
