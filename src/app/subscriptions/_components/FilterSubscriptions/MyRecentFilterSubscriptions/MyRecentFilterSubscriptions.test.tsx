import { render, screen } from '~/test-utils';
import useQueryParams from '~/hooks/useUpdateQueryParams';
import MyRecentFilterSubscriptions from '.';

jest.mock('~/hooks/useUpdateQueryParams');

describe('MyRecentFilterSubscriptions Component', () => {
  const mockUpdateQueryParams = jest.fn();
  const mockGetQueryParam = jest.fn();

  beforeEach(() => {
    (useQueryParams as jest.Mock).mockReturnValue({
      updateQueryParams: mockUpdateQueryParams,
      getQueryParam: mockGetQueryParam,
    });
  });

  it('renders without crashing', () => {
    render(<MyRecentFilterSubscriptions />);
    expect(screen.getByRole('button', { name: /my recent subscribers/i })).toBeInTheDocument();
  });

  it('calls updateQueryParams when button is clicked', async () => {
    const { user } = render(<MyRecentFilterSubscriptions />);
    await user.click(screen.getByRole('button', { name: /my recent subscribers/i }));
    expect(mockUpdateQueryParams).toHaveBeenCalledWith({
      myRecentSubscribers: 'true',
      mySubscribers: null,
    });
  });

  it('calls updateQueryParams with the right params when isActive is true and button is clicked', async () => {
    mockGetQueryParam.mockReturnValue('true');
    const { user } = render(<MyRecentFilterSubscriptions />);
    await user.click(screen.getByRole('button', { name: /my recent subscribers/i }));
    expect(mockUpdateQueryParams).toHaveBeenCalledWith('myRecentSubscribers', null);
  });
});
