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

    ta.style.height = 'auto';

    if (previousValueRef.current !== value) {
      previousValueRef.current = value;

      const minHeight = 34; // Минимальная высота в пикселях
      const scrollHeight = ta.scrollHeight;

      ta.style.height = `${Math.max(scrollHeight, minHeight)}px`;
    }
  }, [textAreaRef, value]);
};
