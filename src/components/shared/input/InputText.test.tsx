import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { InputText } from './InputText';

type TestComponentProps = {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  error?: any;
};

const TestComponent = ({
  name,
  type,
  placeholder,
  label,
  error,
}: TestComponentProps) => {
  const { register } = useForm();

  return (
    <InputText
      name={name}
      type={type}
      placeholder={placeholder}
      label={label}
      error={error}
      register={register}
    />
  );
};

describe('InputText', () => {
  it('renders without crashing', () => {
    render(
      <TestComponent name="test" type="text" placeholder="Test" label="Test" />
    );
    expect(screen.getByLabelText('Test')).toBeInTheDocument();
  });

  it('changes the input value', () => {
    render(
      <TestComponent name="test" type="text" placeholder="Test" label="Test" />
    );
    const input = screen.getByLabelText('Test');
    fireEvent.change(input, { target: { value: 'test value' } });
    expect(input).toHaveValue('test value');
  });

  it('displays the error message', () => {
    render(
      <TestComponent
        name="test"
        type="text"
        placeholder="Test"
        label="Test"
        error={{ type: 'required', message: 'This field is required' }}
      />
    );
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });
});
