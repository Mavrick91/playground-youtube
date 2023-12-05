import React from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

interface InputTextProps {
  name: string;
  type: string;
  placeholder?: string;
  label: string;
  register: UseFormRegister<any>;
  error?: FieldError;
}

export const InputText: React.FC<InputTextProps> = ({
  name,
  type,
  placeholder,
  label,
  register,
  error,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <input
        {...register(name)}
        type={type}
        id={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
      />
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
};
