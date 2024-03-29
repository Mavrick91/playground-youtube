import { render } from '@testing-library/react';
import CategoryFilter from './CategoryFilter';
import CountryFilter from './CountryFilter';
import DateFilter from './DateFilter';
import DurationFilter from './DurationFilter';
import LocationFilter from './LocationFilter';
import OrderFilter from './OrderFilter';
import FilterGroup from './index';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('../shared/Select', () => jest.fn(() => null));
jest.mock('./CategoryFilter', () => jest.fn(() => null));
jest.mock('./CountryFilter', () => jest.fn(() => null));
jest.mock('./LocationFilter', () => jest.fn(() => null));
jest.mock('./DateFilter', () => jest.fn(() => null));
jest.mock('./OrderFilter', () => jest.fn(() => null));
jest.mock('./DurationFilter', () => jest.fn(() => null));

describe('FilterGroup', () => {
  it('renders without crashing', () => {
    render(<FilterGroup />);
  });

  it('renders filter components', () => {
    render(<FilterGroup />);
    expect(CategoryFilter).toHaveBeenCalled();
    expect(CountryFilter).toHaveBeenCalled();
    expect(LocationFilter).toHaveBeenCalled();
    expect(DateFilter).toHaveBeenCalled();
    expect(DurationFilter).toHaveBeenCalled();
    expect(OrderFilter).toHaveBeenCalled();
  });
});
