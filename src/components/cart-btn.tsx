import { Link } from 'react-router-dom';
import { AppRoute } from '../conts';

function CartBtn() {
  return (
    <Link className="cart-btn" to={AppRoute.Basket} aria-label="Переход в корзину">
      <img className="cart__img" src="/images/cart-icon.svg" alt="Иконка тележки" width="30" height="25" />
    </Link>
  );
}

export default CartBtn;
