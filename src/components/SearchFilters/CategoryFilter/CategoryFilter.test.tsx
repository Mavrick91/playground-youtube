import React from 'react';
import { render, fireEvent, screen, waitFor } from '~/test-utils';
import CategoryFilter from './index';
import { CATEGORY_LIST } from '~/constants/category';

describe('CategoryFilter', () => {
  it('renders without crashing', () => {
    const updateFilter = jest.fn();
    render(<CategoryFilter updateFilter={updateFilter} />);
  });

  it('calls updateFilter when a category without subcategories is clicked', async () => {
    const updateFilter = jest.fn();
    const { user } = render(<CategoryFilter updateFilter={updateFilter} />);

    const button = screen.getByRole('button', { name: /Categories/i });

    await user.click(button);
    await user.click(screen.getByText('Other'));

    const clickedCategory = CATEGORY_LIST.find(
      category => category.label === 'Other'
    );

    expect(updateFilter).toHaveBeenCalledWith(clickedCategory);
  });

  it('renders subcategories when a category with subcategories is clicked', async () => {
    const updateFilter = jest.fn();
    const { user } = render(<CategoryFilter updateFilter={updateFilter} />);

    const button = screen.getByRole('button', { name: /Categories/i });

    await user.click(button);
    await user.click(screen.getByText('Music'));

    fireEvent.click(screen.getByText('Christian music'));

    const clickedCategory = CATEGORY_LIST[0].subCategories!.find(
      category => category.label === 'Christian music'
    );

    await waitFor(() => {
      expect(updateFilter).toHaveBeenCalledWith(clickedCategory);
    });
  });
});
