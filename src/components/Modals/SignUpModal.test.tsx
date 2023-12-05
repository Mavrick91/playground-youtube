import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import SignUpModal from './SignUpModal';

describe('SignUpModal', () => {
  it('renders without crashing', () => {
    render(<SignUpModal />);
    expect(screen.getByText('Create and account')).toBeInTheDocument();
  });

  it('submits the form with the entered values', async () => {
    render(<SignUpModal />);
    const emailInput = screen.getByPlaceholderText('john.doe@gmail.com');
    const passwordInput = screen.getAllByPlaceholderText('••••••••')[0];
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    const submitButton = screen.getByText('Create an account');

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(screen.getByPlaceholderText('john.doe@gmail.com')).toHaveValue(
      'test@test.com'
    );
    expect(screen.getAllByPlaceholderText('••••••••')[0]).toHaveValue(
      'password'
    );
    expect(screen.getByLabelText('Confirm Password')).toHaveValue('password');
  });

  it('shows validation errors when fields are empty', async () => {
    render(<SignUpModal />);
    const submitButton = screen.getByText('Create an account');

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(
      screen.getByText('password must be at least 8 characters')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Password confirmation is required')
    ).toBeInTheDocument();
  });
});
