import React from 'react';
import { useToast } from '../contexts/ToastContext';

const Toast = () => {
  const { toasts, removeToast } = useToast();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      default:
        return 'ℹ';
    }
  };

  const getColors = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 min-w-[300px] animate-slide-in"
        >
          <div className={`flex-shrink-0 w-8 h-8 rounded-full ${getColors(toast.type)} flex items-center justify-center text-white font-bold`}>
            {getIcon(toast.type)}
          </div>
          <p className="flex-1 text-sm text-gray-900 dark:text-gray-100">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
