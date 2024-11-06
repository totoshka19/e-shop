import { Link } from 'react-router-dom';
import { AppRoute } from '../conts';

function Header() {
  return (
    <header className="header">
      <div className="header__container container">
        <div className="header__block">
          <Link className="header__logo logo" to={AppRoute.Catalog} aria-label="Переход на главную">
            Логотип
          </Link>
        </div>
        <div className="header__block">
          Кнопка каталог
        </div>

      </div>
    </header>
  );
}

export default Header;
