import React, { useState } from 'react';
import Logo from './logo';
import Contacts from './contacts';
import CartBtn from './cart-btn';
import CatalogBtn from './catalog-btn';

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
          <CatalogBtn
            isDropdownOpen={isDropdownOpen}
            toggleDropdown={toggleDropdown}
            closeDropdown={closeDropdown}
          />
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
