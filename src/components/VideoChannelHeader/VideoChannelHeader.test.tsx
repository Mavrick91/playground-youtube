import { render } from '@testing-library/react';
import ChannelInteractionButtons from './ChannelInteractionButtons';
import ChannelSubscribeButton from './ChannelSubscribeButton';
import VideoPlatformChannelHeader from './index';

jest.mock('./ChannelSubscribeButton', () => jest.fn(() => null));
jest.mock('./ChannelInteractionButtons', () => jest.fn(() => null));

describe('VideoPlatformChannelHeader', () => {
  it('renders the ChannelSubscribeButton and ChannelInteractionButtons components', () => {
    const mockVideo = {}; // replace with a mock video object
    const mockChannel = {}; // replace with a mock channel object

    render(<VideoPlatformChannelHeader video={mockVideo} channel={mockChannel} />);

    expect(ChannelSubscribeButton).toHaveBeenCalled();
    expect(ChannelInteractionButtons).toHaveBeenCalled();
  });
});
