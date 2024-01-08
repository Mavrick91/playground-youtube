import { X } from 'lucide-react';
import React from 'react';

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

export default function Bubble({ children, onClick }: Props) {
  return (
    <div className="border border-gray-600 text-xs px-2 py-1 rounded-full flex gap-2 items-center">
      {children}
      <X
        className="cursor-pointer"
        onClick={onClick}
        size={16}
        color="#4d4f4e70"
        data-testid="bubble-delete"
      />
    </div>
  );
}
