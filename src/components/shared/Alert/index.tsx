import React from 'react';

interface AlertProps {
  type: 'info' | 'danger' | 'success' | 'warning' | 'dark';
  message: string;
}

const Alert: React.FC<AlertProps> = ({ type, message }) => {
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
      <span className="font-medium">Alert!</span> {message}
    </div>
  );
};

export default Alert;
