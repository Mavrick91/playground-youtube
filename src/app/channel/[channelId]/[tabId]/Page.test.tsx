import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import PlaylistPage from '~/components/TabComponents/Playlist';
import VideosPage from '~/components/TabComponents/Videos';
import Page from './page';

jest.mock('~/components/TabComponents/Videos', () => jest.fn(() => null));
jest.mock('~/components/TabComponents/Playlist', () => jest.fn(() => null));

describe('Page Component', () => {
  test('Renders PlaylistPage when tabId is Playlist', () => {
    render(<Page params={{ tabId: 'playlist', channelId: 'channel1' }} />);
    expect(PlaylistPage).toHaveBeenCalled();
  });

  test('renders VideoPage when tabId is Videos', () => {
    render(<Page params={{ tabId: 'videos', channelId: 'channel1' }} />);
    expect(VideosPage).toHaveBeenCalled();
  });

  test('Throws an error when tabId is not valid', () => {
    const consoleError = console.error;
    console.error = jest.fn(); // Temporarily turn off console error

    expect(() => render(<Page params={{ tabId: 'invalid', channelId: 'channel1' }} />)).toThrow('Tab not found');

    console.error = consoleError; // Turn console error back on
  });
});
