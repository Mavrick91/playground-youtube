import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import { format } from 'date-fns';
import useQueryParams from '~/hooks/useUpdateQueryParams';
import DateFilter from './index';

jest.mock('~/hooks/useUpdateQueryParams');

describe('DateFilter', () => {
  const mockUpdateQueryParams = jest.fn();
  const mockGetQueryParam = jest.fn();

  beforeEach(() => {
    (useQueryParams as jest.Mock).mockReturnValue({
      updateQueryParams: mockUpdateQueryParams,
      getQueryParam: mockGetQueryParam,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const selectDate = async (buttonName: string, dateToSelect?: number) => {
    const buttonElement = screen.getByRole('button', {
      name: new RegExp(buttonName, 'i'),
    });
    fireEvent.click(buttonElement);

    const today = new Date();
    const date = dateToSelect || today.getDate();

    const dateElement = await screen.findAllByText(date.toString());
    fireEvent.click(dateElement[0]);

    today.setDate(date);

    return { formatDate: format(today, 'LLL dd, y'), buttonElement };
  };

  it('renders without crashing', () => {
    render(<DateFilter />);
    const publishAfterElement = screen.getByRole('button', {
      name: /Published After/i,
    });
    const publishBeforeElement = screen.getByRole('button', {
      name: /Published Before/i,
    });
    expect(publishAfterElement).toBeInTheDocument();
    expect(publishBeforeElement).toBeInTheDocument();
  });

  it('updates the publishedAfter state when a valid date is selected', async () => {
    render(<DateFilter />);
    const { formatDate, buttonElement } = await selectDate('Published After');
    expect(buttonElement.textContent).toBe(formatDate);
  });

  it('updates the publishedBefore state when a valid date is selected', async () => {
    render(<DateFilter />);
    const { formatDate, buttonElement } = await selectDate('Published Before');
    expect(buttonElement.textContent).toBe(formatDate);
  });

  it('calls updateQueryParams when the filter button is clicked', async () => {
    render(<DateFilter />);
    const filterButtonElement = screen.getByRole('button', {
      name: /Filter by date/i,
    });
    fireEvent.click(filterButtonElement);
    expect(mockUpdateQueryParams).toHaveBeenNthCalledWith(1, {
      publishedAfter: null,
      publishedBefore: null,
    });

    await selectDate('Published Before');
    await selectDate('Published After');

    fireEvent.click(filterButtonElement);
    expect(mockUpdateQueryParams).toHaveBeenNthCalledWith(2, {
      publishedAfter: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
      publishedBefore: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
    });
  });

  it('does not allow selecting a date before the Published After date', async () => {
    render(<DateFilter />);

    await selectDate('Published After');

    const publishBeforeButton = screen.getByRole('button', {
      name: /Published Before/i,
    });
    const initialPublishBeforeValue = publishBeforeButton.textContent;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    await selectDate('Published Before', yesterday.getDate());

    expect(publishBeforeButton.textContent).toBe(initialPublishBeforeValue);
  });

  it('does not allow selecting a date after the Published Before date', async () => {
    render(<DateFilter />);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    await selectDate('Published Before', yesterday.getDate());

    const publishAfterButton = screen.getByRole('button', {
      name: /Published After/i,
    });
    const initialPublishAfterValue = publishAfterButton.textContent;

    await selectDate('Published After');

    expect(publishAfterButton.textContent).toBe(initialPublishAfterValue);
  });

  it('resets the publishedAfter and publishedBefore dates when the Reset button is clicked', async () => {
    render(<DateFilter />);

    const { buttonElement: publishAfterButton } = await selectDate('Published After');

    let resetButtonElement = screen.getByRole('button', { name: /Reset/i });
    fireEvent.click(resetButtonElement);

    expect(publishAfterButton.textContent).toBe('Published After');

    const { buttonElement: publishBeforeButton } = await selectDate('Published Before');

    resetButtonElement = screen.getByRole('button', { name: /Reset/i });
    fireEvent.click(resetButtonElement);

    expect(publishBeforeButton.textContent).toBe('Published Before');
  });

  it('sets the publishedAfter and publishedBefore states based on the query parameters', async () => {
    const dateAfter = new Date('2022-01-01');
    const dateBefore = new Date('2022-12-31');

    mockGetQueryParam.mockImplementation((key: string) => {
      if (key === 'publishedAfter') {
        return dateAfter.toISOString().slice(0, 10);
      }
      if (key === 'publishedBefore') {
        return dateBefore.toISOString().slice(0, 10);
      }

      return '';
    });

    const { rerender } = await act(async () => render(<DateFilter />));

    expect(screen.getByText(format(dateAfter, 'LLL dd, y'))).toBeInTheDocument();
    expect(screen.getByText(format(dateBefore, 'LLL dd, y'))).toBeInTheDocument();

    mockGetQueryParam.mockReturnValueOnce(undefined).mockReturnValueOnce(undefined);
    await act(async () => rerender(<DateFilter />));

    expect(screen.queryByText('Published After')).not.toBeInTheDocument();
    expect(screen.queryByText('Published Before')).not.toBeInTheDocument();
  });

  it('disables the Published After and Published Before buttons when order is videoCount', () => {
    mockGetQueryParam.mockImplementation((key: string) => {
      if (key === 'order') {
        return 'videoCount';
      }
      return '';
    });

    render(<DateFilter />);

    const publishedAfterButton = screen.getByRole('button', {
      name: /Published After/i,
    });
    const publishedBeforeButton = screen.getByRole('button', {
      name: /Published Before/i,
    });

    expect(publishedAfterButton).toBeDisabled();
    expect(publishedBeforeButton).toBeDisabled();
  });
});
