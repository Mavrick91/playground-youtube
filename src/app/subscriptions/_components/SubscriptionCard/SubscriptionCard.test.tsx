import { render, screen } from '@testing-library/react';
import SubscriptionCard from '.';

const mockSubscription = {
  id: '1',
  snippet: {
    title: 'Test Title',
    description: 'Test Description',
    resourceId: {
      channelId: '123',
    },
    thumbnails: {
      high: {
        url: 'http://test.com',
      },
    },
  },
};

describe('SubscriptionCard', () => {
  it('renders without crashing', () => {
    render(<SubscriptionCard subscription={mockSubscription} />);
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('renders ClientImage with correct props', () => {
    render(<SubscriptionCard subscription={mockSubscription} />);
    const img = screen.getByAltText('Test Title');
    const src = decodeURIComponent(img.getAttribute('src') as string);
    expect(src).toContain('http://test.com');
  });

  it('renders Link with correct href prop', () => {
    render(<SubscriptionCard subscription={mockSubscription} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/channel/123');
  });

  it('renders Button with correct text', () => {
    render(<SubscriptionCard subscription={mockSubscription} />);
    expect(screen.getByRole('button')).toHaveTextContent('Subscribe');
  });

  it('renders title and description correctly', () => {
    render(<SubscriptionCard subscription={mockSubscription} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });
});
