import { Link } from 'react-router-dom';
import Contacts from './contacts';
import { AppRoute } from '../conts';

function Header() {
  return (
    <header className="header">
      <div className="header__inner container">
        <div className="header__block header__block-drop-down-list">
          <Link className="header__logo logo" to={AppRoute.Catalog} aria-label="Переход на главную">
            <img className="logo__img" src="/images/logo.svg" alt="Логотип E-Shop" width="40" height="40" />
            <span className="logo__title">E-shop</span>
          </Link>
          <button
            className="header__catalog-btn"
            /*!TODO доделать функционал открытия/закрытия выпадающего списка с категориями товаров*/
            // onClick={toggleDropdown}
            // aria-expanded={isDropdownOpen}
            aria-haspopup="true"
            aria-label="Открыть/закрыть каталог"
          >
            <img className="catalog-btn__img" src="/images/catalog-icon.svg" alt="Иконка каталога" width="21" height="21" />
            <span className="catalog-btn__title">Каталог</span>
          </button>
        </div>
        <div className="header__block">
          <Link className="header__cart-btn" to={AppRoute.Basket} aria-label="Переход в корзину">
            <img className="cart__img" src="/images/cart-icon.svg" alt="Иконка тележки" width="30" height="25" />
          </Link>
          <Contacts />
        </div>
      </div>
    </header>
  );
}

export default Header;
