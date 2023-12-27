import React from 'react';
import { render, screen } from '@testing-library/react';
import { useUser } from '~/providers/UserProvider';
import AuthenticatedUserCheck from './index';

jest.mock('~/providers/UserProvider');

describe('AuthenticatedUserCheck', () => {
  it('renders children when user is authenticated', () => {
    (useUser as jest.Mock).mockReturnValue({ user: { name: 'Test User' } });

    render(
      <AuthenticatedUserCheck>
        <div>Test Content</div>
      </AuthenticatedUserCheck>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('does not render children when user is not authenticated', () => {
    (useUser as jest.Mock).mockReturnValue({ user: null });

    render(
      <AuthenticatedUserCheck>
        <div>Test Content</div>
      </AuthenticatedUserCheck>
    );

    expect(screen.queryByText('Test Content')).toBeNull();
  });
});
