import React from 'react';
import { render, screen } from '@testing-library/react';
import EmailVerificationPopup from './index';

describe('EmailVerificationPopup', () => {
  it('renders the title, message, and footer', () => {
    render(
      <EmailVerificationPopup
        title="Test Title"
        message="Test Message"
        footer={<button>Test Button</button>}
      />
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });
});
