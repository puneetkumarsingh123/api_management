import { useEffect } from 'react';
import '../styles/alert.css';

export default function Alert({ message, type = 'info', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`custom-alert ${type}`}>
      {message}
    </div>
  );
}
