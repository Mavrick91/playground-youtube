import React from 'react';
import { X } from 'lucide-react';
import { cn } from '~/lib/utils';
import { Input } from '../input/InputText';

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  handleClickDeleteSearch: () => void;
  size?: number;
  autoFocus?: boolean;
};

export default function SearchInput({
  value,
  onChange,
  placeholder,
  className,
  handleClickDeleteSearch,
  size,
  autoFocus,
}: Props) {
  return (
    <div className="relative w-full">
      <Input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn('focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none', className)}
        autoFocus={autoFocus}
      />
      {value ? (
        <X
          className="absolute top-1/2 transform -translate-y-1/2 right-5 cursor-pointer"
          onClick={handleClickDeleteSearch}
          size={size || 24}
          color="#4d4f4e70"
          data-testid="search-input-delete"
          strokeWidth={1.5}
        />
      ) : null}
    </div>
  );
}
