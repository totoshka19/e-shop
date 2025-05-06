import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, uploadFile } from '../../store/admin/products-thunks';
import { Product } from '../../types/admin/state-admin';
import { AppDispatch, RootState } from '../../store/store';
import styles from '../../styles/admin/create-product-form.module.scss';
import { fetchCategories } from '../../store/admin/caregories-thunks';
import SelectEntity from './select-entity';
import { CrossIcon } from './icons';

type Attribute = {
  title: string;
  values: Record<string, string>;
}

type CreateProductFormProps = {
  onClose: () => void;
}

type FormData = {
  name: string;
  short_description: string;
  description: string;
  price: string;
  category_id: number;
  is_available: boolean;
  sku: string;
  available_count: string;
  to_feed: boolean;
  attributes: Attribute[];
}

type ProductData = {
  name: string;
  short_description: string;
  description: string;
  price: number;
  category_id: number;
  is_available: number;
  available_count: number;
  sku: string;
  to_feed: boolean;
  attributes: Attribute[];
  logo?: string;
  images?: string[];
}

type FileUploadState = {
  id: string | null;
  name: string;
  loading: boolean;
  error: string | null;
};

const CreateProductForm = ({ onClose }: CreateProductFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector((state: RootState) => state.categories.categories);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    short_description: '',
    description: '',
    price: '',
    category_id: 0,
    is_available: true,
    sku: '',
    available_count: '',
    to_feed: true,
    attributes: [],
  });

  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [selectedSubgroup, setSelectedSubgroup] = useState<number | null>(null);
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [logo, setLogo] = useState<FileUploadState>({ id: null, name: '', loading: false, error: null });
  const [images, setImages] = useState<FileUploadState[]>([]);
  const [validationErrors, setValidationErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const validateField = (name: string, value: any) => {
    switch (name) {
      case 'name':
        return value.trim() !== '';
      case 'short_description':
        return value.trim() !== '';
      case 'description':
        return value.trim() !== '';
      case 'price':
        return value.trim() !== '';
      case 'category_id':
        return value > 0;
      case 'sku':
        return value.trim() !== '';
      default:
        return true;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (name === 'price' || name === 'available_count') {
      // Разрешаем только цифры
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

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setLogo({ id: null, name: '', loading: false, error: null });
      setValidationErrors((prev) => ({ ...prev, logo: true }));
      return;
    }
    setLogo({ id: null, name: file.name, loading: true, error: null });
    try {
      const id = await dispatch(uploadFile(file)).unwrap();
      setLogo({ id, name: file.name, loading: false, error: null });
      setValidationErrors((prev) => ({ ...prev, logo: false }));
    } catch {
      setLogo({ id: null, name: file.name, loading: false, error: 'Ошибка загрузки' });
      setValidationErrors((prev) => ({ ...prev, logo: true }));
    }
  };

  const handleImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) {
      return;
    }

    // Добавляем новые файлы к уже существующим
    const newStates: FileUploadState[] = files.map((f) => ({
      id: null,
      name: f.name,
      loading: true,
      error: null,
    }));

    setImages((prev) => [...prev, ...newStates]);

    // Индекс для новых файлов относительно общего массива
    const startIdx = images.length;

    await Promise.all(files.map(async (file, i) => {
      try {
        const id = await dispatch(uploadFile(file)).unwrap();
        setImages((prev) => {
          const copy = [...prev];
          copy[startIdx + i] = { id, name: file.name, loading: false, error: null };
          return copy;
        });
      } catch {
        setImages((prev) => {
          const copy = [...prev];
          copy[startIdx + i] = { id: null, name: file.name, loading: false, error: 'Ошибка загрузки' };
          return copy;
        });
      }
    }));
  };

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
    setAttributes([...attributes, { title: '', values: {} }]);
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
      category_id: subgroupId || 0
    }));
  };

  const isUploading = logo.loading || images.some((img) => img.loading);

  const isFormValid = () => (
    formData.name.trim() !== '' &&
      formData.short_description.trim() !== '' &&
      formData.description.trim() !== '' &&
      formData.price.trim() !== '' &&
      formData.category_id > 0 &&
      formData.sku.trim() !== '' &&
      logo.id !== null &&
      images.length > 0 && images.every((img) => img.id !== null)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productData: ProductData = {
        name: formData.name,
        short_description: formData.short_description,
        description: formData.description,
        price: parseInt(formData.price) || 0,
        category_id: formData.category_id,
        is_available: formData.is_available ? 1 : 0,
        available_count: parseInt(formData.available_count) || 0,
        sku: formData.sku,
        to_feed: formData.to_feed,
        attributes: formData.attributes,
      };
      if (logo.id) {
        productData.logo = logo.id;
      }
      if (images.length) {
        productData.images = images.filter((img) => img.id).map((img) => img.id!);
      }
      console.log('Отправляемые данные на сервер:', productData);
      await dispatch(createProduct(productData as unknown as Product)).unwrap();
      onClose();
    } catch (error) {
      console.error('Ошибка при создании товара:', error);
      alert((error as Error).message || 'Ошибка при создании товара');
    }
  };

  return (
    <div className={styles['product-manager']}>
      <h2>Создать товар</h2>
      <form className={styles.form} onSubmit={handleSubmit}>

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

        <div className={styles.field}>
          <label>Группа {validationErrors.category_id && <span style={{ color: 'red' }}>*</span>}</label>
          <SelectEntity
            options={categories.map((group) => group.name)}
            value={categories.find((g) => g.id === selectedGroup)?.name || ''}
            onChange={handleGroupChange}
            placeholder="Выберите группу"
            className={validationErrors.category_id ? styles.error : ''}
          />
        </div>

        {selectedGroup && (
          <div className={styles.field}>
            <label>Подгруппа</label>
            <SelectEntity
              options={categories
                .find((group) => group.id === selectedGroup)
                ?.child.map((subgroup) => subgroup.name) || []}
              value={categories
                .find((group) => group.id === selectedGroup)
                ?.child.find((subgroup) => subgroup.id === selectedSubgroup)?.name || ''}
              onChange={handleSubgroupChange}
              placeholder="Выберите подгруппу"
            />
          </div>
        )}

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
              onChange={handleLogoChange}
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
              <span className={styles.cross} onClick={() => console.log(`Файл ${logo.name} удален`)}>
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
              onChange={handleImagesChange}
              id="images-input"
            />
            <label htmlFor="images-input" className={styles['file-button']}>
              Выбрать файлы
            </label>
          </div>

          <div className={styles['file-name']} id="images-name">
            {images.map((img, i) => (
              <p key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {img.loading && `Загрузка: ${img.name}...`}
                {img.error && <span style={{ color: 'red' }}>{img.name}: {img.error}</span>}
                {!img.loading && !img.error && img.name}
                {!img.loading && !img.error && img.name && (
                  <span className={styles.cross} onClick={() => console.log(`Файл ${img.name} удален`)}>
                    <CrossIcon />
                  </span>
                )}
              </p>
            ))}
          </div>
        </div>


        {attributes.length > 0 && <h4>Атрибуты товара</h4>}
        {attributes.map((group, index) => (
          <div key={index} className={styles.attributeGroup}>
            <div className={styles.field}>
              <label>Заголовок группы атрибутов</label>
              <input
                type="text"
                value={group.title}
                onChange={(e) =>
                  handleAttributeChange(index, 'title', undefined, e.target.value)}
                placeholder="Например: Характеристики"
              />
            </div>

            <div className={styles.values}>
              {Object.entries(group.values).map(([key, value], i) => (
                <div key={i} className={styles.attributePair}>
                  <input
                    type="text"
                    value={key}
                    onChange={(e) =>
                      handleAttributeChange(index, 'values', e.target.value, value)}
                    placeholder="Ключ"
                  />
                  <input
                    type="text"
                    value={value}
                    onChange={(e) =>
                      handleAttributeChange(index, 'values', key, e.target.value)}
                    placeholder="Значение"
                  />
                </div>
              ))}
            </div>

            <div className={styles.attributeActions}>
              <button
                type="button"
                onClick={() =>
                  handleAttributeChange(index, 'values', 'новый_ключ', 'новое_значение')}
              >
            Добавить атрибут
              </button>
              {attributes.length > 1 && (
                <button type="button" onClick={() => removeAttributeGroup(index)}>
              Удалить группу
                </button>
              )}
            </div>
          </div>
        ))}

        <button type="button" onClick={addAttributeGroup} className={styles.addFieldBtn}>
          Добавить группу атрибутов
        </button>

        <button
          type="submit"
          className={`${styles['submit-btn']} ${(!isFormValid() || isUploading) ? styles.disabled : ''}`}
        >
          {isUploading ? 'Загрузка файлов...' : 'Создать товар'}
        </button>
      </form>
    </div>

  );
};

export default CreateProductForm;
