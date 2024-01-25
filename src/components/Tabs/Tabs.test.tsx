import { render, screen } from '@testing-library/react';
import { usePathname, useRouter } from 'next/navigation';
import { CHANNEL_TABS } from '~/constants/channel_tabs';
import Tabs from '.';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

const channelId = 'UCRE9cpOPYEBMx4V6vTzfOWQ';

describe('Tabs', () => {
  const mockPush = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({
    push: mockPush,
  });

  (usePathname as jest.Mock).mockReturnValue(`/channel/${channelId}/${CHANNEL_TABS[1].id}`);

  it('renders all tabs', () => {
    render(<Tabs channelId={channelId} activeTab="videos" />);

    CHANNEL_TABS.forEach(tab => {
      expect(screen.getByText(tab.title)).toBeInTheDocument();
    });
  });

  it('sets the first corresponding tab as active', () => {
    render(<Tabs channelId={channelId} activeTab="playlist" />);

    expect(screen.getByText(CHANNEL_TABS[1].title)).toHaveClass('text-opacity-100');
  });

  it('updates the active tab when a tab is clicked', () => {
    render(<Tabs channelId={channelId} activeTab="videos" />);

    const firstTab = screen.getByText(CHANNEL_TABS[0].title);
    const secondTab = screen.getByText(CHANNEL_TABS[1].title);

    expect(firstTab).toHaveAttribute('href', `/channel/${channelId}/${CHANNEL_TABS[0].id}`);
    expect(secondTab).toHaveAttribute('href', `/channel/${channelId}/${CHANNEL_TABS[1].id}`);
  });
});
