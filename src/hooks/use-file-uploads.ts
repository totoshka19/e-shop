import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { uploadFile } from '../store/admin/products-thunks';
import { AppDispatch } from '../store/store';
import { Product } from '../types/admin/state-admin';

export type FileUploadState = {
  id: string | null;
  name: string;
  loading: boolean;
  error: string | null;
};

type UseFileUploadsProps = {
  initialLogo?: Product['logo'];
  initialImages?: Product['images'];
};

export const useFileUploads = ({ initialLogo, initialImages }: UseFileUploadsProps = {}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [logo, setLogo] = useState<FileUploadState>(() => {
    if (initialLogo) {
      if (typeof initialLogo === 'string') {
        return { id: initialLogo, name: 'Существующее изображение', loading: false, error: null };
      } else if (typeof initialLogo === 'object' && 'original_url' in initialLogo && initialLogo.original_url) {
        return { id: (initialLogo as { id: string; file_name: string }).id, name: (initialLogo as { id: string; file_name: string }).file_name, loading: false, error: null };
      }
    }
    return { id: null, name: '', loading: false, error: null };
  });

  const [images, setImages] = useState<FileUploadState[]>(() => {
    if (initialImages && Array.isArray(initialImages)) {
      return initialImages.map((img) => {
        if (typeof img === 'string') {
          return { id: img, name: 'Существующее изображение', loading: false, error: null };
        } else if (img && typeof img === 'object' && 'original_url' in img && img.original_url) {
          return { id: (img as { id: string; file_name: string }).id, name: (img as { id: string; file_name: string }).file_name, loading: false, error: null };
        }
        return { id: null, name: '', loading: false, error: null };
      }).filter((img) => img.id !== null);
    }
    return [];
  });

  const [isUploadingFiles, setIsUploadingFiles] = useState(false);

  const handleLogoChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setLogo({ id: null, name: '', loading: false, error: null });
      return { error: true };
    }
    setLogo({ id: null, name: file.name, loading: true, error: null });
    setIsUploadingFiles(true);
    try {
      const id = await dispatch(uploadFile(file)).unwrap();
      setLogo({ id, name: file.name, loading: false, error: null });
      setIsUploadingFiles(false);
      return { error: false };
    } catch {
      setLogo({ id: null, name: file.name, loading: false, error: 'Ошибка загрузки' });
      setIsUploadingFiles(false);
      return { error: true };
    }
  }, [dispatch]);

  const handleImagesChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) {
      return;
    }

    const newStates: FileUploadState[] = files.map((f) => ({
      id: null,
      name: f.name,
      loading: true,
      error: null,
    }));

    const currentImagesCount = images.length;
    setImages((prev) => [...prev, ...newStates]);
    setIsUploadingFiles(true);

    await Promise.all(files.map(async (file, i) => {
      try {
        const id = await dispatch(uploadFile(file)).unwrap();
        setImages((prev) => {
          const copy = [...prev];
          copy[currentImagesCount + i] = { id, name: file.name, loading: false, error: null };
          return copy;
        });
      } catch {
        setImages((prev) => {
          const copy = [...prev];
          copy[currentImagesCount + i] = { id: null, name: file.name, loading: false, error: 'Ошибка загрузки' };
          return copy;
        });
      }
    }));
    setIsUploadingFiles(false);
  }, [dispatch, images.length]);

  const handleDeleteImage = useCallback((imageId: string | null, isLogo = false) => {
    if (isLogo) {
      setLogo({ id: null, name: '', loading: false, error: null });
    } else {
      setImages((prev) => prev.filter((img) => img.id !== imageId));
    }
  }, []);

  const resetFileUploads = useCallback(() => {
    setLogo({ id: null, name: '', loading: false, error: null });
    setImages([]);
    setIsUploadingFiles(false);
  }, []);

  const setInitialFiles = useCallback((newInitialLogo?: Product['logo'], newInitialImages?: Product['images']) => {
    if (newInitialLogo) {
      if (typeof newInitialLogo === 'string') {
        setLogo({ id: newInitialLogo, name: 'Существующее изображение', loading: false, error: null });
      } else if (typeof newInitialLogo === 'object' && 'original_url' in newInitialLogo && newInitialLogo.original_url) {
        setLogo({ id: (newInitialLogo as { id: string; file_name: string }).id, name: (newInitialLogo as { id: string; file_name: string }).file_name, loading: false, error: null });
      }
    } else {
      setLogo({ id: null, name: '', loading: false, error: null });
    }

    if (newInitialImages && Array.isArray(newInitialImages)) {
      setImages(
        newInitialImages.map((img) => {
          if (typeof img === 'string') {
            return { id: img, name: 'Существующее изображение', loading: false, error: null };
          } else if (img && typeof img === 'object' && 'original_url' in img && img.original_url) {
            return { id: (img as { id: string; file_name: string }).id, name: (img as { id: string; file_name: string }).file_name, loading: false, error: null };
          }
          return { id: null, name: '', loading: false, error: null };
        }).filter((img) => img.id !== null)
      );
    } else {
      setImages([]);
    }
  }, []);


  return {
    logo,
    images,
    isUploadingFiles,
    handleLogoChange,
    handleImagesChange,
    handleDeleteImage,
    resetFileUploads,
    setInitialFiles,
    setLogo,
    setImages
  };
};
