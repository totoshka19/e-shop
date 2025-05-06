import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import styles from '../../styles/admin/products-list.module.scss';
import { PlusIcon, MinusIcon, EditIcon, DeleteIcon } from './icons';
import { fetchProducts } from '../../store/admin/products-thunks';
import { Product } from '../../types/admin/state-admin';

function ProductsList() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.adminProducts.products);
  const [expandedProducts, setExpandedProducts] = useState<number[]>([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const toggleProduct = (productId: number) => {
    setExpandedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Преобразуем поля продукта в массив характеристик
  const getProductCharacteristics = (product: Product) => [
    { id: 0, name: 'ID', value: product.id.toString() },
    { id: 1, name: 'Краткое описание', value: product.short_description },
    { id: 2, name: 'Описание', value: product.description },
    { id: 3, name: 'Цена', value: `${product.price} ₽` },
    { id: 4, name: 'Артикул', value: product.sku },
    { id: 5, name: 'Количество', value: product.available_count.toString() },
    { id: 6, name: 'В наличии', value: product.is_available ? 'Да' : 'Нет' },
    { id: 7, name: 'Отправить в Яндекс товары', value: product.to_feed ? 'Да' : 'Нет' },
    {
      id: 8,
      name: 'Логотип',
      value: product.logo
        ? (typeof product.logo === 'object'
          ? ((product.logo).original_url
            ? <a href={(product.logo).original_url} target="_blank" rel="noopener noreferrer">{(product.logo).file_name || 'Ссылка'}</a>
            : (product.logo).file_name || 'Файл')
          : product.logo)
        : 'Нет'
    },
  ];

  return (
    <div className={styles['products-manager']}>
      <h2>Список товаров</h2>

      <ul>
        {products.map((product) => (
          <li key={product.id} className={styles['product-item']}>
            <div className={styles['product-header']}>
              <button
                className={styles['toggle-btn']}
                onClick={() => toggleProduct(product.id)}
              >
                {expandedProducts.includes(product.id) ? (
                  <MinusIcon color="#555" />
                ) : (
                  <PlusIcon color="#555" />
                )}
              </button>

              <span className={styles['product-name']}>{product.name}</span>

              <div className={styles['product-actions']}>
                <button className={styles['edit-btn']}>
                  <EditIcon />
                </button>
                <button className={styles['delete-btn']}>
                  <DeleteIcon />
                </button>
              </div>
            </div>

            {expandedProducts.includes(product.id) && (
              <ul className={styles['characteristics']}>
                {getProductCharacteristics(product).map((characteristic) => (
                  <li key={`${product.id}-${characteristic.id}`} className={styles['characteristic-item']}>
                    <div className={styles['characteristic-content']}>
                      <span className={styles['characteristic-name']}>
                        {characteristic.name}
                      </span>
                      <span className={styles['characteristic-value']}>
                        {characteristic.value}
                      </span>
                    </div>
                    <div className={styles['product-actions']}>
                      <button className={styles['edit-btn']}>
                        <EditIcon />
                      </button>
                      <button className={styles['delete-btn']}>
                        <DeleteIcon />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsList;
