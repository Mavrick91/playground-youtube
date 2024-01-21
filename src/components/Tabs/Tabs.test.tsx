import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { CHANNEL_TABS } from '~/constants/channe_tabs';
import Tabs from '.';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Tabs', () => {
  const mockPush = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({
    push: mockPush,
  });

  const renderTabs = () => render(<Tabs />);

  it('renders all tabs', () => {
    renderTabs();

    CHANNEL_TABS.forEach(tab => {
      expect(screen.getByText(tab.title)).toBeInTheDocument();
    });
  });

  it('sets the first tab as active by default', () => {
    renderTabs();

    expect(screen.getByText(CHANNEL_TABS[0].title)).toHaveClass('text-opacity-100');
  });

  it('updates the active tab when a tab is clicked', () => {
    renderTabs();

    const secondTab = screen.getByText(CHANNEL_TABS[1].title);
    fireEvent.click(secondTab);

    expect(secondTab).toHaveClass('text-opacity-100');
    expect(mockPush).toHaveBeenCalled();
  });
});
