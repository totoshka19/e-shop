import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsDropdownOpen, setIsCatalogBtnInFooter } from '../../store/public/catalog-slice';
import DropdownCatalog from './drop-down-catalog';
import { AppDispatch, RootState } from '../../store/store';

type CatalogBtnProps = {
  isFooter?: boolean;
};

function CatalogBtn({ isFooter }: CatalogBtnProps) {
  const dispatch = useDispatch<AppDispatch>();
  const isDropdownOpen = useSelector((state: RootState) => state.catalog.isDropdownOpen);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(setIsDropdownOpen(!isDropdownOpen));
    if (isFooter) {
      dispatch(setIsCatalogBtnInFooter(true));
    }
  };

  return (
    <>
      <button
        ref={buttonRef}
        className="catalog-btn"
        onClick={handleClick}
        aria-expanded={isDropdownOpen ? 'true' : 'false'}
        aria-haspopup="true"
        aria-label="Открыть/закрыть каталог"
      >
        <div className="catalog-btn__icon-wrapper">
          <img
            className={`catalog-btn__img ${isDropdownOpen ? 'fade-out' : 'fade-in'}`}
            src="/public/images/catalog-icon.svg"
            alt="Иконка каталога"
            width="21"
            height="21"
            style={{ display: isDropdownOpen ? 'none' : 'block' }}
          />
          <img
            className={`catalog-btn__img ${isDropdownOpen ? 'fade-in' : 'fade-out'}`}
            src="/public/images/catalog-icon-open.svg"
            alt="Иконка каталога (открыто)"
            width="21"
            height="21"
            style={{ display: isDropdownOpen ? 'block' : 'none' }}
          />
        </div>
        <span className="catalog-btn__title">Каталог</span>
      </button>
      {isDropdownOpen && (
        <DropdownCatalog
          isOpen={isDropdownOpen}
          onClose={() => dispatch(setIsDropdownOpen(false))}
          buttonRef={buttonRef}
        />
      )}
    </>
  );
}

export default CatalogBtn;
