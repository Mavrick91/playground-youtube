import { fireEvent, render } from '@testing-library/react';
import { youtube_v3 } from 'googleapis';
import CommentStats from './index';

describe('CommentStats', () => {
    const comment: youtube_v3.Schema$CommentSnippet = {
        likeCount: 10,
    };

    const toggleReply = jest.fn();

    it('renders without crashing', () => {
        render(<CommentStats comment={comment} toggleReply={toggleReply} />);
    });

    it('renders like count', () => {
        const { getByText } = render(<CommentStats comment={comment} toggleReply={toggleReply} />);
        expect(getByText('10')).toBeInTheDocument();
    });

    it('calls toggleReply when reply button is clicked', () => {
        const { getByText } = render(<CommentStats comment={comment} toggleReply={toggleReply} />);
        fireEvent.click(getByText('Reply'));
        expect(toggleReply).toHaveBeenCalled();
    });
});