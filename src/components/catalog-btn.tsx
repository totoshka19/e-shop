import React, { useRef } from 'react';
import DropdownCatalog from './drop-down-catalog';

interface CatalogBtnProps {
  isDropdownOpen: boolean;
  toggleDropdown: (event: React.MouseEvent) => void;
  closeDropdown: () => void;
}

function CatalogBtn({ isDropdownOpen, toggleDropdown, closeDropdown }: CatalogBtnProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <button
        ref={buttonRef}
        className="catalog-btn"
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
    </>
  );
}

export default CatalogBtn;
