import { useEffect } from 'react';

export default function useAutoSize(element, maxHeight, defaultRowCount) {
  const autosize = () => {
    if (element.current) {
      const rowCount = (element.current.value.split(/\r*\n/).length) || 1;
      setTimeout(() => {
        if (defaultRowCount === 1 && defaultRowCount && rowCount === 1) {
          element.current.style.cssText = 'height: auto; padding: 0;' + (maxHeight ? `max-height: ${maxHeight}px` : '');
          element.current.style.cssText = `height: 24px; max-height: ${maxHeight}px;`;
        } else {
          element.current.style.cssText = 'height: auto; padding: 0;' + (maxHeight ? `max-height: ${maxHeight}px` : '');
          element.current.style.cssText = `height: ${element.current
            .scrollHeight + 10}px; max-height: ${maxHeight}px;`;
        }
      }, 0);
    }
  };
  useEffect(() => {
    autosize();
    if (element.current) {
      element.current.addEventListener('keydown', autosize);
    }
    return () => {
      if (element.current) {
        element.current.removeEventListener('keydown', autosize);
      }
    };
  });
}
