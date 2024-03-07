import React from 'react';
import { render } from '@testing-library/react';
import FilterSubscriptions from '.';
import OrderFilterSubscriptions from './OrderFilterSubscriptions';
import MyRecentFilterSubscriptions from './MyRecentFilterSubscriptions';
import MySubscribersFilterSubscriptions from './MySubscribersFilterSubscriptions';

jest.mock('./OrderFilterSubscriptions', () => jest.fn(() => null));
jest.mock('./MyRecentFilterSubscriptions', () => jest.fn(() => null));
jest.mock('./MySubscribersFilterSubscriptions', () => jest.fn(() => null));

describe('FilterSubscriptions', () => {
  it('renders sub-components', () => {
    render(<FilterSubscriptions />);

    expect(OrderFilterSubscriptions).toHaveBeenCalled();
    expect(MyRecentFilterSubscriptions).toHaveBeenCalled();
    expect(MySubscribersFilterSubscriptions).toHaveBeenCalled();
  });
});
