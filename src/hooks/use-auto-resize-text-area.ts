import React, { useEffect, useRef } from 'react';

export const useAutoResizeTextArea = (
  textAreaRef: React.RefObject<HTMLTextAreaElement>,
  value: string
) => {
  const previousValueRef = useRef<string>(value);

  useEffect(() => {
    // Проверяем, действительно ли изменилось значение
    if (previousValueRef.current !== value) {
      previousValueRef.current = value;

      const ta = textAreaRef.current;
      if (!ta) {
        return;
      }

      ta.style.height = 'auto';
      ta.style.height = `${ta.scrollHeight}px`;
    }
  }, [textAreaRef, value]);
};
