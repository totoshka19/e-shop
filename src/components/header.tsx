import Logo from './logo';
import Contacts from './contacts';
import CartBtn from './cart-btn';
import CatalogBtn from './catalog-btn';

function Header() {

  return (
    <header className="header">
      <div className="header__inner container">
        <div className="header__block header__block-drop-down-list">
          <Logo className="header__logo" />
          <CatalogBtn />
        </div>
        <div className="header__block">
          <CartBtn />
          <Contacts className="header__contacts" />
        </div>
      </div>
    </header>
  );
}

export default Header;
