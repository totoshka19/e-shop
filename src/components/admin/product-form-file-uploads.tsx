import React from 'react';
import { CrossIcon } from './icons';
import { FileUploadState } from '../../hooks/use-file-uploads';

interface ProductFormFileUploadsProps {
  logo: FileUploadState;
  images: FileUploadState[];
  handleLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleImagesUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleDeleteImage: (id: string | null, isLogo?: boolean) => void;
  styles: Record<string, string>;
}

function ProductFormFileUploads(props: ProductFormFileUploadsProps): JSX.Element {
  const {
    logo,
    images,
    handleLogoUpload,
    handleImagesUpload,
    handleDeleteImage,
    styles,
  } = props;

  return (
    <>
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
          {images.map((img: FileUploadState) => (
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
    </>
  );
}

export default ProductFormFileUploads;
