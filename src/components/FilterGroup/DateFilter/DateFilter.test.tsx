import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import DateFilter from './index';
import { format } from 'date-fns';
import useQueryParams from '~/hooks/useUpdateQueryParams';

jest.mock('~/hooks/useUpdateQueryParams');

describe('DateFilter', () => {
  const mockUpdateQueryParams = jest.fn();

  beforeEach(() => {
    (useQueryParams as jest.Mock).mockReturnValue({
      updateQueryParams: mockUpdateQueryParams,
      getQueryParam: jest.fn(),
    });
  });

  const selectDate = async (buttonName: string, dateToSelect?: number) => {
    const buttonElement = screen.getByRole('button', {
      name: new RegExp(buttonName, 'i'),
    });
    fireEvent.click(buttonElement);

    const today = new Date();
    // If dateToSelect is not provided, use today's date
    const date = dateToSelect || today.getDate();

    const dateElement = await screen.findByText(date.toString());
    fireEvent.click(dateElement);

    // Set the day to the selected date
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
      publishedAfter: expect.any(String),
      publishedBefore: expect.any(String),
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

    const { buttonElement: publishAfterButton } =
      await selectDate('Published After');

    let resetButtonElement = screen.getByRole('button', { name: /Reset/i });
    fireEvent.click(resetButtonElement);

    expect(publishAfterButton.textContent).toBe('Published After');

    const { buttonElement: publishBeforeButton } =
      await selectDate('Published Before');

    resetButtonElement = screen.getByRole('button', { name: /Reset/i });
    fireEvent.click(resetButtonElement);

    expect(publishBeforeButton.textContent).toBe('Published Before');
  });
});
