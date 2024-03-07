import { render, screen } from '~/test-utils';
import useQueryParams from '~/hooks/useUpdateQueryParams';
import MySubscribersFilterSubscriptions from '.';

jest.mock('~/hooks/useUpdateQueryParams');

describe('MySubscribersFilterSubscriptions Component', () => {
  const mockUpdateQueryParams = jest.fn();
  const mockGetQueryParam = jest.fn();

  beforeEach(() => {
    (useQueryParams as jest.Mock).mockReturnValue({
      updateQueryParams: mockUpdateQueryParams,
      getQueryParam: mockGetQueryParam,
    });
  });

  it('renders without crashing', () => {
    render(<MySubscribersFilterSubscriptions />);
    expect(screen.getByRole('button', { name: /My subscribers/i })).toBeInTheDocument();
  });

  it('calls updateQueryParams when button is clicked', async () => {
    const { user } = render(<MySubscribersFilterSubscriptions />);
    await user.click(screen.getByRole('button', { name: /My subscribers/i }));
    expect(mockUpdateQueryParams).toHaveBeenCalledWith({
      myRecentSubscribers: null,
      mySubscribers: 'true',
    });
  });

  it('calls updateQueryParams with the right params when isActive is true and button is clicked', async () => {
    mockGetQueryParam.mockReturnValue('true');
    const { user } = render(<MySubscribersFilterSubscriptions />);
    await user.click(screen.getByRole('button', { name: /My subscribers/i }));
    expect(mockUpdateQueryParams).toHaveBeenCalledWith('mySubscribers', null);
  });
});
