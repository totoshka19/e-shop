import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Logo from './logo';
import DropdownCatalog from './drop-down-catalog';
import Contacts from './contacts';
import { AppRoute } from '../conts';

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const toggleDropdown = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="header__inner container">
        <div className="header__block header__block-drop-down-list">
          <Logo className="header__logo" />
          <button
            ref={buttonRef}
            className="header__catalog-btn"
            onClick={toggleDropdown}
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
            aria-label="Открыть/закрыть каталог"
          >
            <div className="catalog-btn__icon-wrapper">
              <img
                className={`catalog-btn__img ${isDropdownOpen ? 'fade-out' : 'fade-in'}`}
                src="/images/catalog-icon.svg"
                alt="Иконка каталога"
                width="21"
                height="21"
              />
              <img
                className={`catalog-btn__img ${isDropdownOpen ? 'fade-in' : 'fade-out'}`}
                src="/images/catalog-icon-open.svg"
                alt="Иконка каталога (открыто)"
                width="21"
                height="21"
              />
            </div>
            <span className="catalog-btn__title">Каталог</span>
          </button>
          {isDropdownOpen && (
            <DropdownCatalog isOpen={isDropdownOpen} onClose={closeDropdown} buttonRef={buttonRef} />
          )}
        </div>
        <div className="header__block">
          <Link className="header__cart-btn" to={AppRoute.Basket} aria-label="Переход в корзину">
            <img className="cart__img" src="/images/cart-icon.svg" alt="Иконка тележки" width="30" height="25" />
          </Link>
          <Contacts className="header__contacts" />
        </div>
      </div>
    </header>
  );
}

export default Header;
