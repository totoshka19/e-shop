import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct, fetchProductById, fetchProducts } from '../../store/admin/products-thunks';
import {Attribute, Product, FormData, ProductData} from '../../types/admin/state-admin';
import { AppDispatch, RootState } from '../../store/store';
import styles from '../../styles/admin/create-product-form.module.scss';
import { fetchCategories } from '../../store/admin/caregories-thunks';
import { CrossIcon } from './icons';
import { useFileUploads } from '../../hooks/use-file-uploads';
import AttributesSection from './attributes-section';
import CategorySelector from './category-selector';

type ProductFormProps = {
  onClose: () => void;
  product?: Product;
}

function ProductForm ({ onClose, product: initialProduct }: ProductFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector((state: RootState) => state.categories.categories);
  const currentProduct = useSelector((state: RootState) => state.adminProducts.currentProduct);

  const {
    logo,
    images,
    isUploadingFiles,
    handleLogoChange: hookHandleLogoChange,
    handleImagesChange: hookHandleImagesChange,
    handleDeleteImage,
    resetFileUploads,
    setInitialFiles,
  } = useFileUploads();

  useEffect(() => {
    if (initialProduct && initialProduct.id) {
      dispatch(fetchProductById(initialProduct.id));
    }
    if (!initialProduct) {
      resetFileUploads();
    }
  }, [dispatch, initialProduct, resetFileUploads]);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    // eslint-disable-next-line camelcase
    short_description: '',
    description: '',
    price: '',
    // eslint-disable-next-line camelcase
    category_id: 0,
    // eslint-disable-next-line camelcase
    is_available: false,
    sku: '',
    // eslint-disable-next-line camelcase
    available_count: '',
    // eslint-disable-next-line camelcase
    to_feed: true,
    attributes: [],
  });

  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [selectedSubgroup, setSelectedSubgroup] = useState<number | null>(null);
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [validationErrors, setValidationErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (initialProduct) {
      const productToLoad = (currentProduct && initialProduct.id && currentProduct.id === initialProduct.id)
        ? currentProduct
        : initialProduct;

      setFormData({
        name: productToLoad.name || '',
        // eslint-disable-next-line camelcase
        short_description: productToLoad.short_description || '',
        description: productToLoad.description || '',
        price: productToLoad.price?.toString() || '',
        // eslint-disable-next-line camelcase
        category_id: productToLoad.category_id || 0,
        // eslint-disable-next-line camelcase
        is_available: productToLoad.is_available || false,
        sku: productToLoad.sku || '',
        // eslint-disable-next-line camelcase
        available_count: productToLoad.available_count?.toString() || '',
        // eslint-disable-next-line camelcase
        to_feed: productToLoad.to_feed === undefined ? true : productToLoad.to_feed,
        attributes: productToLoad.attributes || [],
      });

      setInitialFiles(productToLoad.logo, productToLoad.images);
      setAttributes(productToLoad.attributes || []);

      if (productToLoad.category_id && categories.length > 0) {
        let parentGroupId: number | null = null;
        let subgroupIdValue: number | null = productToLoad.category_id;

        for (const group of categories) {
          if (group.child && group.child.some((sub) => sub.id === productToLoad.category_id)) {
            parentGroupId = group.id;
            break;
          } else if (group.id === productToLoad.category_id) {
            parentGroupId = group.id;
            subgroupIdValue = null;
            break;
          }
        }
        setSelectedGroup(parentGroupId);
        setSelectedSubgroup(subgroupIdValue);
      } else {
        setSelectedGroup(null);
        setSelectedSubgroup(null);
      }
    } else {
      setFormData({
        name: '',
        // eslint-disable-next-line camelcase
        short_description: '',
        description: '',
        price: '',
        // eslint-disable-next-line camelcase
        category_id: 0,
        // eslint-disable-next-line camelcase
        is_available: false,
        sku: '',
        // eslint-disable-next-line camelcase
        available_count: '',
        // eslint-disable-next-line camelcase
        to_feed: true,
        attributes: [],
      });
      setAttributes([]);
      setSelectedGroup(null);
      setSelectedSubgroup(null);
    }
  }, [currentProduct, initialProduct, categories, dispatch, setInitialFiles, resetFileUploads]);

  const validateField = (name: string, value: string | number | boolean) => {
    switch (name) {
      case 'name':
      case 'short_description':
      case 'description':
      case 'sku':
        return typeof value === 'string' && value.trim() !== '';
      case 'price':
      case 'available_count':
        return typeof value === 'string' && value.trim() !== '';
      case 'category_id':
        return typeof value === 'number' && value > 0;
      default:
        return true;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (name === 'price' || name === 'available_count') {
      const numericValue = value.replace(/[^\d]/g, '');
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
      return;
    }

    if (type === 'number') {
      setFormData((prev) => ({
        ...prev,
        [name]: parseFloat(value) || 0,
      }));
    } else if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setValidationErrors((prev) => ({
      ...prev,
      [name]: !validateField(name, value)
    }));
  };

  const handleLogoUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = await hookHandleLogoChange(e);
    if (result?.error) {
      setValidationErrors((prev) => ({ ...prev, logo: true }));
    } else {
      setValidationErrors((prev) => ({ ...prev, logo: false }));
    }
  }, [hookHandleLogoChange]);

  const handleImagesUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    await hookHandleImagesChange(e);
  }, [hookHandleImagesChange]);

  const handleAttributeChange = (
    index: number,
    field: 'title' | 'values',
    key?: string,
    value?: string
  ) => {
    const updated = [...attributes];
    if (field === 'title' && value !== undefined) {
      updated[index].title = value;
    } else if (field === 'values' && key !== undefined && value !== undefined) {
      updated[index].values = {
        ...updated[index].values,
        [key]: value,
      };
    }
    setAttributes(updated);
    setFormData((prev) => ({
      ...prev,
      attributes: updated,
    }));
  };

  const addAttributeGroup = () => {
    const newAttribute: Attribute = { title: '', values: {} };
    setAttributes([...attributes, newAttribute]);
  };

  const removeAttributeGroup = (index: number) => {
    const updated = attributes.filter((_, idx) => idx !== index);
    setAttributes(updated);
    setFormData((prev) => ({
      ...prev,
      attributes: updated,
    }));
  };

  const handleGroupChange = (value: string) => {
    const group = categories.find((g) => g.name === value);
    const groupId = group?.id || null;
    setSelectedGroup(groupId);
    setSelectedSubgroup(null);
    setFormData((prev) => ({
      ...prev,
      // eslint-disable-next-line camelcase
      category_id: 0
    }));
  };

  const handleSubgroupChange = (value: string) => {
    const selectedGroupObj = categories.find((g) => g.id === selectedGroup);
    const subgroup = selectedGroupObj?.child.find((s) => s.name === value);
    const subgroupId = subgroup?.id || null;
    setSelectedSubgroup(subgroupId);
    setFormData((prev) => ({
      ...prev,
      // eslint-disable-next-line camelcase
      category_id: subgroupId || 0
    }));
  };

  const isFormValid = () => (
    formData.name.trim() !== '' &&
      formData.short_description.trim() !== '' &&
      formData.description.trim() !== '' &&
      formData.price.trim() !== '' &&
      formData.category_id > 0 &&
      formData.sku.trim() !== '' &&
      logo.id !== null &&
      images.length > 0 && images.every((img) => img.id !== null) &&
      !images.some((img) => img.error) &&
      !logo.error
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productData: ProductData = {
        name: formData.name,
        // eslint-disable-next-line camelcase
        short_description: formData.short_description,
        description: formData.description,
        price: parseInt(formData.price, 10) || 0,
        // eslint-disable-next-line camelcase
        category_id: selectedSubgroup || selectedGroup || formData.category_id || 0,
        // eslint-disable-next-line camelcase
        is_available: formData.is_available ? 1 : 0,
        // eslint-disable-next-line camelcase
        available_count: parseInt(formData.available_count, 10) || 0,
        sku: formData.sku,
        // eslint-disable-next-line camelcase
        to_feed: formData.to_feed,
        attributes: attributes,
      };
      if (logo.id) {
        productData.logo = logo.id;
      }
      if (images.length) {
        productData.images = images.filter((img) => img.id).map((img) => img.id as string);
      }

      if (initialProduct && initialProduct.id) {
        const updatedProductSend = {
          ...productData,
          id: initialProduct.id,
          // eslint-disable-next-line camelcase
          is_available: formData.is_available,
        };
        await dispatch(updateProduct(updatedProductSend as Product)).unwrap();
      } else {
        await dispatch(createProduct(productData as unknown as Product)).unwrap();
      }
      await dispatch(fetchProducts());
      onClose();
    } catch (error) {
      // Можно добавить пользовательское уведомление об ошибке
    }
  };

  const getSubmitButtonText = () => {
    if (isUploadingFiles) {
      return 'Загрузка файлов...';
    }
    if (initialProduct) {
      return 'Сохранить изменения';
    }
    return 'Создать товар';
  };

  return (
    <div className={styles['product-manager']}>
      <h2>{initialProduct ? 'Редактировать товар' : 'Создать товар'}</h2>
      <form className={styles.form} onSubmit={(e) => {
        void handleSubmit(e);
      }}
      >

        <div className={styles.field}>
          <label>Название {validationErrors.name && <span style={{ color: 'red' }}>*</span>}</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={validationErrors.name ? styles.error : ''}
          />
        </div>

        <div className={styles.field}>
          <label>Краткое описание {validationErrors.short_description && <span style={{ color: 'red' }}>*</span>}</label>
          <textarea
            name="short_description"
            value={formData.short_description}
            onChange={handleChange}
            required
            className={validationErrors.short_description ? styles.error : ''}
          />
        </div>

        <div className={styles.field}>
          <label>Полное описание {validationErrors.description && <span style={{ color: 'red' }}>*</span>}</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className={validationErrors.description ? styles.error : ''}
          />
        </div>

        <div className={styles.field}>
          <label>Цена, руб.</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="0"
            required
          />
        </div>

        <CategorySelector
          categories={categories}
          selectedGroup={selectedGroup}
          selectedSubgroup={selectedSubgroup}
          onGroupChange={handleGroupChange}
          onSubgroupChange={handleSubgroupChange}
          validationError={validationErrors.category_id}
          styles={styles}
        />

        <div className={styles.field}>
          <label>Артикул (SKU) {validationErrors.sku && <span style={{ color: 'red' }}>*</span>}</label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            required
            className={validationErrors.sku ? styles.error : ''}
          />
        </div>

        <div className={styles.field}>
          <label>Доступное количество</label>
          <input
            type="text"
            name="available_count"
            value={formData.available_count}
            onChange={handleChange}
            placeholder="0"
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.customCheckbox}>
            <input
              type="checkbox"
              name="is_available"
              checked={formData.is_available}
              onChange={handleChange}
            />
            <span className={styles.checkmark}></span>
            В наличии
          </label>
        </div>

        <div className={styles.field}>
          <label className={styles.customCheckbox}>
            <input
              type="checkbox"
              name="to_feed"
              checked={formData.to_feed}
              onChange={handleChange}
            />
            <span className={styles.checkmark}></span>
            Отправить в Яндекс товары
          </label>
        </div>

        <div className={`${styles.field} ${styles['file-field']}`}>
          <div className={`${styles.field} ${styles['file-field_wrapper']}`}>
            <label>Заглавная картинка</label>
            <input
              type="file"
              name="logo"
              onChange={(e) => {
                void handleLogoUpload(e);
              }}
              id="logo-input"
            />
            <label htmlFor="logo-input" className={styles['file-button']}>
              Выбрать файл
            </label>
          </div>

          <p className={styles['file-name']} id="logo-name" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {logo.loading && 'Загрузка...'}
            {logo.error && <span style={{ color: 'red' }}>{logo.error}</span>}
            {!logo.loading && !logo.error && logo.name}
            {!logo.loading && !logo.error && logo.name && (
              <span
                className={styles.cross}
                onClick={() => handleDeleteImage(logo.id, true)}
                style={{ cursor: 'pointer' }}
              >
                <CrossIcon />
              </span>
            )}
          </p>
        </div>

        <div className={`${styles.field} ${styles['file-field']}`}>
          <div className={`${styles.field} ${styles['file-field_wrapper']}`}>
            <label>Дополнительные изображения</label>
            <input
              type="file"
              name="images"
              multiple
              onChange={(e) => {
                void handleImagesUpload(e);
              }}
              id="images-input"
            />
            <label htmlFor="images-input" className={styles['file-button']}>
              Выбрать файлы
            </label>
          </div>

          <div className={styles['file-name']} id="images-name">
            {images.map((img) => (
              <p key={img.id || img.name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {img.loading && `Загрузка: ${img.name}...`}
                {img.error && <span style={{ color: 'red' }}>{img.name}: {img.error}</span>}
                {!img.loading && !img.error && (img.name || img.id || 'Существующее изображение')}
                {!img.loading && !img.error && (img.name || img.id) && (
                  <span
                    className={styles.cross}
                    onClick={() => handleDeleteImage(img.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <CrossIcon />
                  </span>
                )}
              </p>
            ))}
          </div>
        </div>

        <AttributesSection
          attributes={attributes}
          onAttributeChange={handleAttributeChange}
          onAddAttributeGroup={addAttributeGroup}
          onRemoveAttributeGroup={removeAttributeGroup}
          styles={styles}
        />

        <button
          type="submit"
          className={`${styles['submit-btn']} ${(!isFormValid() || isUploadingFiles) ? styles.disabled : ''}`}
        >
          {getSubmitButtonText()}
        </button>
      </form>
    </div>

  );
}

export default ProductForm;
