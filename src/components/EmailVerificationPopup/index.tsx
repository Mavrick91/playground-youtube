import React, { ReactNode } from 'react';

type EmailVerificationPopupProps = {
  title: string;
  message: string;
  footer: ReactNode | null;
};

export default function EmailVerificationPopup({
  title,
  message,
  footer,
}: EmailVerificationPopupProps) {
  return (
    <div className="fixed w-5/12 top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-white rounded-lg shadow dark:bg-gray-800 md:p-8">
      <div className="mb-4 text-sm font-light text-gray-500 dark:text-gray-400">
        <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p>{message}</p>
      </div>
      <div className="flex justify-end w-min ml-auto">{footer}</div>
    </div>
  );
}
