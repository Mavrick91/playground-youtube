import { fireEvent, render, screen } from '@testing-library/react';
import { usePathname, useRouter } from 'next/navigation';
import { CHANNEL_TABS } from '~/constants/channe_tabs';
import Tabs from '.';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe('Tabs', () => {
  const mockPush = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({
    push: mockPush,
  });

  (usePathname as jest.Mock).mockReturnValue(`/channel/UCRE9cpOPYEBMx4V6vTzfOWQ/${CHANNEL_TABS[1].id}`);

  it('renders all tabs', () => {
    render(<Tabs activeTab="videos" />);

    CHANNEL_TABS.forEach(tab => {
      expect(screen.getByText(tab.title)).toBeInTheDocument();
    });
  });

  it('sets the first corresponding tab as active', () => {
    render(<Tabs activeTab="playlist" />);

    expect(screen.getByText(CHANNEL_TABS[1].title)).toHaveClass('text-opacity-100');
  });

  it('updates the active tab when a tab is clicked', () => {
    render(<Tabs activeTab="videos" />);

    const secondTab = screen.getByText(CHANNEL_TABS[1].title);
    fireEvent.click(secondTab);

    expect(secondTab).toHaveClass('text-opacity-100');
    expect(mockPush).toHaveBeenCalled();
  });
});
