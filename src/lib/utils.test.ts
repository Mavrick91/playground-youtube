import { formatNumber } from './utils';

describe('formatNumber', () => {
  it('should return "Invalid number" for non-numeric input', () => {
    expect(formatNumber('abc')).toBe('Invalid number');
  });

  it('should return the number as a string for numbers less than 1000', () => {
    expect(formatNumber('500')).toBe('500');
  });

  it('should format numbers in the thousands with a "K" suffix', () => {
    expect(formatNumber('1500')).toBe('1.5 K');
  });

  it('should format numbers in the millions with an "M" suffix', () => {
    expect(formatNumber('1500000')).toBe('1.5 M');
  });

  it('should format numbers in the billions with a "B" suffix', () => {
    expect(formatNumber('1500000000')).toBe('1.5 B');
  });
});
