import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import PlaylistPage from '~/app/channel/_components/TabComponents/Playlist';
import VideosPage from '~/app/channel/_components/TabComponents/Videos';
import Page from './page';

jest.mock('~/app/channel/_components/TabComponents/Videos', () => jest.fn(() => null));
jest.mock('~/app/channel/_components/TabComponents/Playlist', () => jest.fn(() => null));

describe('Page Component', () => {
  test('Renders PlaylistPage when tabId is Playlist', () => {
    render(<Page params={{ slug: ['channel1', 'playlist'] }} />);
    expect(PlaylistPage).toHaveBeenCalled();
  });

  test('renders VideoPage when tabId is Videos', () => {
    render(<Page params={{ slug: ['channel1', 'videos'] }} />);
    expect(VideosPage).toHaveBeenCalled();
  });

  test('renders VideoPage when tabId is undefined', () => {
    render(<Page params={{ slug: ['channel1'] }} />);
    expect(VideosPage).toHaveBeenCalled();
  });

  test('render VideoPage when tabId is invalid', () => {
    render(<Page params={{ slug: ['channel1', 'invalid'] }} />);
    expect(VideosPage).toHaveBeenCalled();
  });
});
