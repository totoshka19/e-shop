import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../store/admin/products-thunks';
import { Product } from '../../types/admin/state-admin';
import styles from '../../styles/admin/create-product-form.module.scss';
import {AppDispatch} from '../../store/store';

interface Attribute {
  title: string;
  values: Record<string, string>;
}

const CreateProductForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    // eslint-disable-next-line camelcase
    short_description: '',
    description: '',
    price: 0,
    // eslint-disable-next-line camelcase
    category_id: 0,
    // eslint-disable-next-line camelcase
    is_available: true,
    logo: null,
    images: [],
    sku: '',
    // eslint-disable-next-line camelcase
    available_count: 0,
    // eslint-disable-next-line camelcase
    to_feed: true,
    attributes: [],
  });

  const [attributes, setAttributes] = useState<Attribute[]>([
    { title: '', values: {} },
  ]);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) {
      return;
    }

    if (name === 'logo') {
      setFormData((prev) => ({
        ...prev,
        logo: files[0],
      }));
    } else if (name === 'images') {
      setFormData((prev) => ({
        ...prev,
        images: Array.from(files),
      }));
    }
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

    // Обновляем formData
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const preparedData = new FormData();

    // Добавляем простые поля
    (Object.keys(formData) as Array<keyof typeof formData>).forEach((key) => {
      if (key === 'logo' || key === 'images') {
        const files = formData[key];
        if (Array.isArray(files)) {
          files.forEach((file) => preparedData.append('images[]', file));
        } else if (files) {
          preparedData.append('logo', files);
        }
      } else if (typeof formData[key] === 'boolean') {
        preparedData.append(key, formData[key] ? '1' : '0');
      } else {
        preparedData.append(key, String(formData[key]));
      }
    });

    dispatch(createProduct(preparedData));
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

        <div className={styles.field}>
          <label>Логотип</label>
          <input type="file" name="logo" onChange={handleFileChange} />
        </div>

        <div className={styles.field}>
          <label>Изображения</label>
          <input type="file" name="images" multiple onChange={handleFileChange} />
        </div>

        <h4>Атрибуты товара</h4>
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

        <button type="submit" className={styles['submit-btn']}>
      Создать товар
        </button>
      </form>
    </div>

  );
};

export default CreateProductForm;
