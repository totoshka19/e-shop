import React, { useRef, useState } from 'react';
import { usePopUp } from '../hooks/use-pop-up';

type DropdownCatalogProps = {
  isOpen: boolean;
  onClose: () => void;
}

type Category = {
  id: number;
  name: string;
  subcategories: Subcategory[];
}

type Subcategory = {
  id: number;
  name: string;
}

function DropdownCatalog({ isOpen, onClose }: DropdownCatalogProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const { handleOverlayClick } = usePopUp({
    onClose,
    modalRef,
  });

  const categories: Category[] = [
    {
      id: 1,
      name: 'Электроника',
      subcategories: [
        { id: 1, name: 'Смартфоны' },
        { id: 2, name: 'Ноутбуки' },
        { id: 3, name: 'Телевизоры' },
      ],
    },
    {
      id: 2,
      name: 'Одежда',
      subcategories: [
        { id: 4, name: 'Мужская одежда' },
        { id: 5, name: 'Женская одежда' },
      ],
    },
    {
      id: 3,
      name: 'Дом и сад',
      subcategories: [
        { id: 6, name: 'Мебель' },
        { id: 7, name: 'Освещение' },
      ],
    },
  ];

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="dropdown-catalog-overlay" onClick={handleOverlayClick} />

      <div className="dropdown-catalog" ref={modalRef}>
        <div className="dropdown-catalog__content">
          <ul className="dropdown-catalog__categories">
            {categories.map((category) => (
              <li
                key={category.id}
                className="dropdown-catalog__category"
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="dropdown-catalog__category-title">{category.name}</span>
              </li>
            ))}
          </ul>

          {activeCategory !== null && (
            <ul className="dropdown-catalog__subcategories">
              {categories
                .find((category) => category.id === activeCategory)
                ?.subcategories.map((subcategory) => (
                  <li key={subcategory.id} className="dropdown-catalog__subcategory">
                    <span>{subcategory.name}</span>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default DropdownCatalog;
