import { useEffect } from 'react';

export default function useEscCloseModal(onClose) {
  const handleESC = (e) => {
    if (e.keyCode === 27) {
      onClose();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleESC);
    return () => {
      document.removeEventListener('keydown', handleESC);
    };
  });
}
