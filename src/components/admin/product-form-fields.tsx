import React from 'react';
import { FormData } from '../../types/admin/state-admin';

interface ProductFormFieldsProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  validationErrors: Record<string, boolean>;
  styles: Record<string, string>;
}

function ProductFormFields({
  formData,
  handleChange,
  validationErrors,
  styles,
}: ProductFormFieldsProps): JSX.Element {
  return (
    <>
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
    </>
  );
}

export default ProductFormFields;
