import React, { useEffect, useState } from 'react';

export type AlertType = 'info' | 'danger' | 'success' | 'warning' | 'dark';

type AlertProps = {
  type: AlertType;
  message: string;
  timeout?: number; // in milliseconds
};

const Alert: React.FC<AlertProps> = ({ type, message, timeout }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (timeout) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, timeout);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [timeout]);

  if (!visible) {
    return null;
  }

  const alertColors = {
    info: 'text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400',
    danger: 'text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400',
    success: 'text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400',
    warning:
      'text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300',
    dark: 'text-gray-800 bg-gray-50 dark:bg-gray-800 dark:text-gray-300',
  };

  return (
    <div
      className={`p-4 mb-4 text-sm rounded-lg ${alertColors[type]}`}
      role="alert"
    >
      {message}
    </div>
  );
};

export default Alert;
