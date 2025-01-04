import React, {useEffect, useRef, useState} from 'react';
import { createMockProductsArray } from '../mock/utils';

type DropdownCatalogProps = {
  isOpen: boolean;
}

type Category = {
  name: string;
  subcategories: Subcategory[];
};

type Subcategory = {
  name: string;
};

function DropdownCatalog({ isOpen }: DropdownCatalogProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

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

  if (!isOpen) {
    return null;
  }

  return (
    <div className="dropdown-catalog" ref={modalRef}>
      <div className="dropdown-catalog__content">
        <ul className="dropdown-catalog__categories">
          {categories.map((category) => (
            <li
              key={category.name}
              className="dropdown-catalog__category"
              onClick={() => setActiveCategory(category.name)}
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
  );
}

export default DropdownCatalog;
