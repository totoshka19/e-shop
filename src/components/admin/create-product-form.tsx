import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct, uploadFile } from '../../store/admin/products-thunks';
import { Product } from '../../types/admin/state-admin';
import styles from '../../styles/admin/create-product-form.module.scss';
import {AppDispatch} from '../../store/store';

interface Attribute {
  title: string;
  values: Record<string, string>;
}

interface CreateProductFormProps {
  onClose: () => void;
}

interface FormData {
  name: string;
  short_description: string;
  description: string;
  price: number;
  category_id: number;
  is_available: boolean;
  sku: string;
  available_count: number;
  to_feed: boolean;
  attributes: Attribute[];
}

interface ProductData {
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

  const [formData, setFormData] = useState<FormData>({
    name: '',
    short_description: '',
    description: '',
    price: 0,
    category_id: 0,
    is_available: true,
    sku: '',
    available_count: 0,
    to_feed: true,
    attributes: [],
  });

  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [logo, setLogo] = useState<FileUploadState>({ id: null, name: '', loading: false, error: null });
  const [images, setImages] = useState<FileUploadState[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
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
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setLogo({ id: null, name: '', loading: false, error: null });
      return;
    }
    setLogo({ id: null, name: file.name, loading: true, error: null });
    try {
      const id = await dispatch(uploadFile(file)).unwrap();
      setLogo({ id, name: file.name, loading: false, error: null });
    } catch {
      setLogo({ id: null, name: file.name, loading: false, error: 'Ошибка загрузки' });
    }
  };

  const handleImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newStates: FileUploadState[] = files.map(f => ({ id: null, name: f.name, loading: true, error: null }));
    setImages(newStates);
    await Promise.all(files.map(async (file, i) => {
      try {
        const id = await dispatch(uploadFile(file)).unwrap();
        setImages(prev => {
          const copy = [...prev];
          copy[i] = { id, name: file.name, loading: false, error: null };
          return copy;
        });
      } catch {
        setImages(prev => {
          const copy = [...prev];
          copy[i] = { id: null, name: file.name, loading: false, error: 'Ошибка загрузки' };
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

  const isUploading = logo.loading || images.some(img => img.loading);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productData: ProductData = {
        name: formData.name,
        short_description: formData.short_description,
        description: formData.description,
        price: formData.price,
        category_id: formData.category_id,
        is_available: formData.is_available ? 1 : 0,
        available_count: formData.available_count,
        sku: formData.sku,
        to_feed: formData.to_feed,
        attributes: formData.attributes,
      };
      if (logo.id) productData.logo = logo.id;
      if (images.length) productData.images = images.filter(img => img.id).map(img => img.id!);
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
          <label>Название</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className={styles.field}>
          <label>Краткое описание</label>
          <textarea
            name="short_description"
            value={formData.short_description}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label>Полное описание</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label>Цена, руб.</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label>ID категории</label>
          <input
            type="number"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.field}>
          <label>Артикул (SKU)</label>
          <input type="text" name="sku" value={formData.sku} onChange={handleChange} required />
        </div>

        <div className={styles.field}>
          <label>Доступное количество</label>
          <input
            type="number"
            name="available_count"
            value={formData.available_count}
            onChange={handleChange}
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
          <label>Логотип</label>
          <input
            type="file"
            name="logo"
            onChange={handleLogoChange}
            id="logo-input"
          />
          <label htmlFor="logo-input" className={styles['file-button']}>
            Выбрать файл
          </label>
          <span className={styles['file-name']} id="logo-name">
            {logo.loading && 'Загрузка...'}
            {logo.error && <span style={{ color: 'red' }}>{logo.error}</span>}
            {!logo.loading && !logo.error && logo.name}
          </span>
        </div>

        <div className={`${styles.field} ${styles['file-field']}`}>
          <label>Изображения</label>
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
          <span className={styles['file-name']} id="images-name">
            {images.map((img, i) => (
              <span key={i}>
                {img.loading && `Загрузка: ${img.name}... `}
                {img.error && <span style={{ color: 'red' }}>{img.name}: {img.error} </span>}
                {!img.loading && !img.error && img.name + ' '}
              </span>
            ))}
          </span>
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

        <button type="submit" className={styles['submit-btn']} disabled={isUploading}>
          {isUploading ? 'Загрузка файлов...' : 'Создать товар'}
        </button>
      </form>
    </div>

  );
};

export default CreateProductForm;
