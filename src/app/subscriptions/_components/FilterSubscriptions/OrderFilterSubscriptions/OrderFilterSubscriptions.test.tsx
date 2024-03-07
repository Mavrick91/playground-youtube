import { render, fireEvent, screen } from '~/test-utils';
import useQueryParams from '~/hooks/useUpdateQueryParams';
import OrderFilterSubscriptions from '.';

jest.mock('~/hooks/useUpdateQueryParams');

describe('OrderFilterSubscriptions', () => {
  const mockUpdateQueryParams = jest.fn();
  const mockGetQueryParam = jest.fn();

  beforeEach(() => {
    (useQueryParams as jest.Mock).mockReturnValue({
      updateQueryParams: mockUpdateQueryParams,
      getQueryParam: mockGetQueryParam,
    });
  });

  it('renders without crashing', () => {
    render(<OrderFilterSubscriptions />);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls updateQueryParams when the filter button is clicked', async () => {
    const { user } = render(<OrderFilterSubscriptions />);

    const button = screen.getByRole('button', { name: /Order/i });

    await user.click(button);

    fireEvent.click(screen.getByText('Sort by Channel Name (A-Z)'));

    expect(mockUpdateQueryParams).toHaveBeenNthCalledWith(1, 'order', 'alphabetical');

    await user.click(button);

    fireEvent.click(screen.getByText('Sort by Activity'));

    expect(mockUpdateQueryParams).toHaveBeenNthCalledWith(2, 'order', 'unread');
  });

  it('calls updateQueryParams with null when the reset button is clicked', async () => {
    const { user } = render(<OrderFilterSubscriptions />);

    const button = screen.getByRole('button', { name: /Order/i });

    await user.click(button);

    const resetButton = screen.getByText(/Reset/i);
    fireEvent.click(resetButton);

    expect(mockUpdateQueryParams).toHaveBeenCalledWith('order', null);
  });
});
