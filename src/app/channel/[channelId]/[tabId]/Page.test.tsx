import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import FeaturedPage from '~/components/TabComponents/Featured';
import PlaylistPage from '~/components/TabComponents/Playlist';
import Page from './page';

jest.mock('~/components/TabComponents/Featured', () => jest.fn(() => null));
jest.mock('~/components/TabComponents/Playlist', () => jest.fn(() => null));

describe('Page Component', () => {
  test('Renders FeaturedPage when tabId is Featured', () => {
    render(<Page params={{ tabId: 'featured', channelId: 'channel1' }} />);
    expect(FeaturedPage).toHaveBeenCalled();
  });

  test('Renders PlaylistPage when tabId is Playlist', () => {
    render(<Page params={{ tabId: 'playlist', channelId: 'channel1' }} />);
    expect(PlaylistPage).toHaveBeenCalled();
  });

  test('Throws an error when tabId is not valid', () => {
    const consoleError = console.error;
    console.error = jest.fn(); // Temporarily turn off console error

    expect(() => render(<Page params={{ tabId: 'invalid', channelId: 'channel1' }} />)).toThrow('Tab not found');

    console.error = consoleError; // Turn console error back on
  });
});
