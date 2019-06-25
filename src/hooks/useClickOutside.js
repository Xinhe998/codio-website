import { useEffect } from 'react';

export default function useClickOutside(status, ref, onClick) {
  const handleClick = (e) => {
    if (status && ref.current) {
      const isOutside = (!ref.current.contains(e.target));
      if (isOutside) {
        onClick();
      }
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
}
