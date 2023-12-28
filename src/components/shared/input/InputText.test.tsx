import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './InputText';

describe('Input', () => {
  it('renders without crashing', () => {
    render(<Input />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  it('accepts input', () => {
    render(<Input />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    expect((inputElement as HTMLInputElement).value).toBe('test');
  });

  it('passes on its props', () => {
    render(<Input data-testid="myInput" />);
    const inputElement = screen.getByTestId('myInput');
    expect(inputElement).toBeInTheDocument();
  });

  it('passes className prop to input element', () => {
    render(<Input className="test-class" />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass('test-class');
  });

  it('passes ref prop to input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeDefined();
  });
});
