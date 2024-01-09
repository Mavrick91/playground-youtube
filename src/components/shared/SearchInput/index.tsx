import React from 'react';
import { Input } from '../input/InputText';
import { X } from 'lucide-react';
import { cn } from '~/lib/utils';

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  handleClickDeleteSearch: () => void;
  size?: number;
};

export default function SearchInput({
  value,
  onChange,
  placeholder,
  className,
  handleClickDeleteSearch,
  size,
}: Props) {
  return (
    <div className="relative w-full">
      <Input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none',
          className
        )}
      />
      {value ? (
        <X
          className="absolute top-1/2 transform -translate-y-1/2 right-5 cursor-pointer"
          onClick={handleClickDeleteSearch}
          size={size ? size : 24}
          color="#4d4f4e70"
          data-testid="search-input-delete"
        />
      ) : null}
    </div>
  );
}
