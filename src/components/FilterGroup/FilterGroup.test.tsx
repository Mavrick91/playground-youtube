import React from 'react';
import { render, screen } from '@testing-library/react';
import FilterGroup from './index';
import Select from '../shared/Select';
import CategoryFilter from './CategoryFilter';
import CountryFilter from './CountryFilter';
import LocationFilter from './LocationFilter';
import DateFilter from './DateFilter';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('../shared/Select', () => jest.fn(() => null));
jest.mock('./CategoryFilter', () => jest.fn(() => null));
jest.mock('./CountryFilter', () => jest.fn(() => null));
jest.mock('./LocationFilter', () => jest.fn(() => null));
jest.mock('./DateFilter', () => jest.fn(() => null));

describe('FilterGroup', () => {
  it('renders without crashing', () => {
    render(<FilterGroup />);
    expect(screen.getByText('Order by:')).toBeInTheDocument();
  });

  it('renders Select with correct props', () => {
    render(<FilterGroup />);
    expect(Select).toHaveBeenCalledWith(
      {
        options: [
          { value: 'date', label: 'Date' },
          { value: 'rating', label: 'Rating' },
          { value: 'relevance', label: 'Relevance' },
          { value: 'title', label: 'Title' },
          { value: 'videoCount', label: 'Video count' },
          { value: 'viewCount', label: 'View count' },
        ],
        defaultValue: { value: 'date', label: 'Date' },
      },
      {}
    );
  });

  it('renders filter components', () => {
    render(<FilterGroup />);
    expect(CategoryFilter).toHaveBeenCalled();
    expect(CountryFilter).toHaveBeenCalled();
    expect(LocationFilter).toHaveBeenCalled();
    expect(DateFilter).toHaveBeenCalled();
  });
});
