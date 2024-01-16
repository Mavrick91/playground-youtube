import { arePublishedDatesValid, formatNumber, isValidDate, parseISO8601Duration } from './utils';

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

describe('arePublishedDatesValid', () => {
  it('returns false when publishedAfter is not a valid date string', () => {
    const result = arePublishedDatesValid('invalid date', '2024-01-02');
    expect(result).toBe(false);
  });

  it('returns false when publishedBefore is not a valid date string', () => {
    const result = arePublishedDatesValid('2024-01-01', 'invalid date');
    expect(result).toBe(false);
  });

  it('returns false when publishedAfter is after publishedBefore', () => {
    const result = arePublishedDatesValid('2024-01-02', '2024-01-01');
    expect(result).toBe(false);
  });

  it('returns false when publishedBefore is before publishedAfter', () => {
    const result = arePublishedDatesValid('2024-01-02', '2024-01-01');
    expect(result).toBe(false);
  });

  it('returns true when publishedAfter is before publishedBefore', () => {
    const result = arePublishedDatesValid('2024-01-01', '2024-01-02');
    expect(result).toBe(true);
  });

  it('returns true when only publishedAfter is provided and it is a valid date string', () => {
    const result = arePublishedDatesValid('2024-01-01', undefined);
    expect(result).toBe(true);
  });

  it('returns true when only publishedBefore is provided and it is a valid date string', () => {
    const result = arePublishedDatesValid(undefined, '2024-01-02');
    expect(result).toBe(true);
  });

  it('returns true when both publishedAfter and publishedBefore are null', () => {
    const result = arePublishedDatesValid(undefined, undefined);
    expect(result).toBe(false);
  });
});

describe('isValidDate', () => {
  it('returns false when the date string is not in the format YYYY-MM-DD', () => {
    const result = isValidDate('invalid date');
    expect(result).toBe(false);
  });

  it('returns false when the date string is in the format YYYY-MM-DD but the date is not valid', () => {
    const result = isValidDate('2024-02-30');
    expect(result).toBe(false);
  });

  it('returns true when the date string is in the format YYYY-MM-DD and the date is valid', () => {
    const result = isValidDate('2024-01-01');
    expect(result).toBe(true);
  });
});


describe('parseISO8601Duration', () => {
  it('should correctly parse ISO 8601 duration strings', () => {
    expect(parseISO8601Duration('PT1H')).toBe('01:00:00'); // 1 hour
    expect(parseISO8601Duration('PT1M')).toBe('01:00'); // 1 minute
    expect(parseISO8601Duration('PT1S')).toBe('00:01'); // 1 second
    expect(parseISO8601Duration('PT1H1M1S')).toBe('01:01:01'); // 1 hour, 1 minute, 1 second
    expect(parseISO8601Duration('PT2H30M')).toBe('02:30:00'); // 2 hours, 30 minutes
  });

  it('should return "00:00" for invalid or empty strings', () => {
    expect(parseISO8601Duration('')).toBe('00:00');
    expect(parseISO8601Duration('invalid')).toBe('00:00');
  });
});
