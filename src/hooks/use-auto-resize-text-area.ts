import React, { useEffect } from 'react';

export const useAutoResizeTextArea = (
  textAreaRef: React.RefObject<HTMLTextAreaElement>,
  value: string
) => {
  useEffect(() => {
    const ta = textAreaRef.current;
    if (!ta) {
      return;
    }

    ta.style.height = 'auto';
    ta.style.height = `${ta.scrollHeight}px`;
  }, [textAreaRef, value]);
};
