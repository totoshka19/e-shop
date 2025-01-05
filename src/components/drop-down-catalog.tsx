import React, { useEffect, useRef, useState } from 'react';
import { createMockProductsArray } from '../mock/utils';
import { usePopUp } from '../hooks/use-pop-up';

type DropdownCatalogProps = {
  isOpen: boolean;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
};

type Category = {
  name: string;
  subcategories: Subcategory[];
};

type Subcategory = {
  name: string;
};

function DropdownCatalog({ isOpen, onClose, buttonRef }: DropdownCatalogProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const { handleOverlayClick } = usePopUp({
    onClose,
    modalRef,
    isOpen,
  });

  useEffect(() => {
    const mockProducts = createMockProductsArray();

    const categoriesMap = new Map<string, Category>();

    mockProducts.forEach((product) => {
      if (!categoriesMap.has(product.category)) {
        categoriesMap.set(product.category, {
          name: product.category,
          subcategories: [],
        });
      }

      const category = categoriesMap.get(product.category);
      if (category && !category.subcategories.some((sub) => sub.name === product.subcategory)) {
        category.subcategories.push({
          name: product.subcategory,
        });
      }
    });

    setCategories(Array.from(categoriesMap.values()));
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setActiveCategory(null);
      return;
    }

    if (buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: buttonRect.bottom + window.scrollY,
        left: buttonRect.left + window.scrollX,
      });
    }
  }, [isOpen, buttonRef]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="dropdown-catalog-overlay"
      onClick={handleOverlayClick}
    >
      <div
        className="dropdown-catalog"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute',
          top: position.top,
          left: position.left,
        }}
      >
        <div className="dropdown-catalog__content">
          <ul className="dropdown-catalog__categories">
            {categories.map((category) => (
              <li
                key={category.name}
                className={`dropdown-catalog__category ${
                  activeCategory === category.name ? 'active' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveCategory(category.name);
                }}
              >
                <span className="dropdown-catalog__category-title">{category.name}</span>
              </li>
            ))}
          </ul>

          {activeCategory !== null && (
            <ul className="dropdown-catalog__subcategories">
              {categories
                .find((category) => category.name === activeCategory)
                ?.subcategories.map((subcategory) => (
                  <li key={subcategory.name} className="dropdown-catalog__subcategory">
                    <span className="dropdown-catalog__subcategory-title">{subcategory.name}</span>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default DropdownCatalog;
