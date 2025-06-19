import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import styles from '../../styles/admin/products-list.module.scss';
import { PlusIcon, MinusIcon, EditIcon, DeleteIcon } from './icons';
import { fetchProducts, deleteProduct } from '../../store/admin/products-thunks';
import { fetchCategories } from '../../store/admin/caregories-thunks';
import { Product } from '../../types/admin/state-admin';
import Popup from './popup';
import {Category} from '../../types/public/product';

// Define props for ProductsList
interface ProductsListProps {
  onEditRequest: (product: Product) => void;
}

// Вспомогательная функция для отображения логотипа без вложенных тернарников
const getLogoValue = (logo: Product['logo']) => {
  if (!logo) {
    return 'Нет';
  }
  if (typeof logo === 'object') {
    if (logo.original_url) {
      return (
        <a href={logo.original_url} target="_blank" rel="noopener noreferrer">
          {logo.file_name || 'Ссылка'}
        </a>
      );
    }
    return logo.file_name || 'Файл';
  }
  return logo;
};

function ProductsList({ onEditRequest }: ProductsListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.adminProducts.products);
  const allCategories = useSelector((state: RootState) => state.categories.categories);
  const [expandedProducts, setExpandedProducts] = useState<number[]>([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const toggleProduct = (productId: number) => {
    setExpandedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setIsDeletePopupOpen(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      dispatch(deleteProduct(productToDelete.id));
      setIsDeletePopupOpen(false);
      setProductToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDeletePopupOpen(false);
    setProductToDelete(null);
  };

  const handleEditClick = (product: Product) => {
    onEditRequest(product);
  };

  // Преобразуем поля продукта в массив характеристик
  const getProductCharacteristics = (product: Product) => {
    let groupName = 'Не указана';
    let subGroupName = '—';

    if (product.category) {
      const parentGroup = allCategories.find((cat) =>
        cat.child?.some((sub: Category) => sub.id === product.category?.id)
      );

      if (parentGroup) {
        groupName = parentGroup.name;
        subGroupName = product.category.name;
      } else {
        groupName = product.category.name;
      }
    }

    return [
      { id: 0, name: 'ID', value: product.id.toString() },
      { id: 1, name: 'Краткое описание', value: product.short_description },
      { id: 2, name: 'Описание', value: product.description },
      { id: 3, name: 'Цена', value: `${product.price} ₽` },
      { id: 9, name: 'Группа', value: groupName },
      { id: 10, name: 'Подгруппа', value: subGroupName },
      { id: 4, name: 'Артикул', value: product.sku },
      { id: 5, name: 'Количество', value: product.available_count.toString() },
      { id: 6, name: 'В наличии', value: product.is_available ? 'Да' : 'Нет' },
      { id: 7, name: 'Отправить в Яндекс товары', value: product.to_feed ? 'Да' : 'Нет' },
      {
        id: 8,
        name: 'Логотип',
        value: getLogoValue(product.logo),
      },
    ];
  };

  return (
    <div className={styles['products-manager']}>
      <h2>Список товаров</h2>
      <ul>
        {products.map((product) => {
          const isExpanded = expandedProducts.includes(product.id);
          const toggleIcon = isExpanded ? <MinusIcon color="#555" /> : <PlusIcon color="#555" />;
          return (
            <li key={product.id} className={styles['product-item']}>
              <div className={styles['product-header']}>
                <button
                  className={styles['toggle-btn']}
                  onClick={() => toggleProduct(product.id)}
                >
                  {toggleIcon}
                </button>

                <span className={styles['product-name']}>{product.name}</span>

                <div className={styles['product-actions']}>
                  <button className={styles['edit-btn']} onClick={() => handleEditClick(product)}>
                    <EditIcon />
                  </button>
                  <button
                    className={styles['delete-btn']}
                    onClick={() => handleDeleteClick(product)}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>

              {isExpanded && (
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
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>

      <Popup
        isOpen={isDeletePopupOpen}
        message={
          <>
            Вы уверены, что хотите удалить товар{' '}
            <strong>{productToDelete?.name}</strong>?
          </>
        }
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        type="confirmation"
      />
    </div>
  );
}

export default ProductsList;
