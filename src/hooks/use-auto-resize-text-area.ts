import React, { useEffect, useRef } from 'react';

export const useAutoResizeTextArea = (
  textAreaRef: React.RefObject<HTMLTextAreaElement>,
  value: string
) => {
  const previousValueRef = useRef<string>(value);

  useEffect(() => {
    const ta = textAreaRef.current;
    if (!ta) {
      return;
    }

    // Всегда сбрасываем высоту перед расчетом новой
    ta.style.height = 'auto';
    
    // Проверяем, действительно ли изменилось значение
    if (previousValueRef.current !== value) {
      previousValueRef.current = value;
      
      // Устанавливаем минимальную высоту
      const minHeight = 34; // Минимальная высота в пикселях
      const scrollHeight = ta.scrollHeight;
      
      // Устанавливаем новую высоту, но не меньше минимальной
      ta.style.height = `${Math.max(scrollHeight, minHeight)}px`;
    }
  }, [textAreaRef, value]);
};
