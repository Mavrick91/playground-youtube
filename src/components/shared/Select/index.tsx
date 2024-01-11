import React from 'react';
import ReactSelect from 'react-select';
import './select.css';

type OptionType = { value: string; label: string };
type Props = {
  options: OptionType[];
  placeholder?: string;
  defaultValue?: OptionType;
};

export default function Select({ options, placeholder, defaultValue }: Props) {
  return (
    <ReactSelect
      classNamePrefix="react-select"
      options={options}
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
  );
}
