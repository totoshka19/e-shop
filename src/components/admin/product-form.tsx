import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct, fetchProductById, fetchProducts } from '../../store/admin/products-thunks';
import {Attribute, Product, FormData, ProductData} from '../../types/admin/state-admin';
import { AppDispatch, RootState } from '../../store/store';
import styles from '../../styles/admin/create-product-form.module.scss';
import { fetchCategories } from '../../store/admin/caregories-thunks';
import { useFileUploads } from '../../hooks/use-file-uploads';
import AttributesSection from './attributes-section';
import CategorySelector from './category-selector';
import ProductFormFields from './product-form-fields';
import ProductFormFileUploads from './product-form-file-uploads';

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
    short_description: '',
    description: '',
    price: '',
    category_id: 0,
    is_available: false,
    sku: '',
    available_count: '',
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
        short_description: productToLoad.short_description || '',
        description: productToLoad.description || '',
        price: productToLoad.price?.toString() || '',
        category_id: productToLoad.category?.id || productToLoad.category_id || 0,
        is_available: productToLoad.is_available || false,
        sku: productToLoad.sku || '',
        available_count: productToLoad.available_count?.toString() || '',
        to_feed: productToLoad.to_feed === undefined ? true : productToLoad.to_feed,
        attributes: productToLoad.attributes || [],
      });

      setInitialFiles(productToLoad.logo, productToLoad.images);
      setAttributes(productToLoad.attributes || []);
    } else {
      setFormData({
        name: '',
        short_description: '',
        description: '',
        price: '',
        category_id: 0,
        is_available: false,
        sku: '',
        available_count: '',
        to_feed: true,
        attributes: [],
      });
      setAttributes([]);
      setSelectedGroup(null);
      setSelectedSubgroup(null);
    }
  }, [currentProduct, initialProduct, setInitialFiles]);

  useEffect(() => {
    const productToLoad = (currentProduct && initialProduct?.id === currentProduct.id)
      ? currentProduct
      : initialProduct;

    const categoryId = productToLoad?.category?.id;

    if (categoryId && categories.length > 0) {
      let parentGroupId: number | null = null;
      let subgroupIdValue: number | null = categoryId;

      for (const group of categories) {
        if (group.child && group.child.some((sub) => sub.id === categoryId)) {
          parentGroupId = group.id;
          break;
        } else if (group.id === categoryId) {
          parentGroupId = group.id;
          subgroupIdValue = null;
          break;
        }
      }
      setSelectedGroup(parentGroupId);
      setSelectedSubgroup(subgroupIdValue);
    }
  }, [currentProduct, initialProduct, categories]);

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
    setAttributes((prevAttributes) => {
      const updated = [...prevAttributes];
      if (field === 'title' && value !== undefined) {
        updated[index] = {
          ...updated[index],
          title: value
        };
      } else if (field === 'values' && key !== undefined && value !== undefined) {
        updated[index] = {
          ...updated[index],
          values: {
            ...updated[index].values,
            [key]: value,
          }
        };
      }
      return updated;
    });

    setFormData((prev) => ({
      ...prev,
      attributes: attributes
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
      category_id: groupId || 0
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

  const isFormValid = () => (
    formData.name.trim() !== '' &&
    formData.short_description.trim() !== '' &&
    formData.description.trim() !== '' &&
    formData.price.trim() !== '' &&
    (selectedSubgroup !== null || selectedGroup !== null) &&
    formData.sku.trim() !== '' &&
    logo.id !== null &&
    images.length > 0 && images.every((img) => img.id !== null) &&
    !images.some((img) => img.error) &&
    !logo.error
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const finalCategoryId = selectedSubgroup ?? selectedGroup;
      if (!finalCategoryId) {
        setValidationErrors((prev) => ({...prev, category_id: true}));
        return;
      }

      const productData: ProductData = {
        name: formData.name,
        short_description: formData.short_description,
        description: formData.description,
        price: parseInt(formData.price, 10) || 0,
        category_id: finalCategoryId,
        is_available: formData.is_available ? 1 : 0,
        available_count: parseInt(formData.available_count, 10) || 0,
        sku: formData.sku,
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

        <ProductFormFields
          formData={formData}
          handleChange={handleChange}
          validationErrors={validationErrors}
          styles={styles}
        />

        <CategorySelector
          categories={categories}
          selectedGroup={selectedGroup}
          selectedSubgroup={selectedSubgroup}
          onGroupChange={handleGroupChange}
          onSubgroupChange={handleSubgroupChange}
          validationError={validationErrors.category_id}
          styles={styles}
        />

        <ProductFormFileUploads
          logo={logo}
          images={images}
          handleLogoUpload={handleLogoUpload}
          handleImagesUpload={handleImagesUpload}
          handleDeleteImage={handleDeleteImage}
          styles={styles}
        />

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
