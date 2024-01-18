import { getYouTubeClient } from '../services/oauthService';
import { formDataToObject, postComment } from './action';

jest.mock('../services/oauthService');

describe('postComment', () => {
  it('should call commentThreads.insert if videoId is provided', async () => {
    const mockInsert = jest.fn();
    (getYouTubeClient as jest.Mock).mockReturnValue({
      commentThreads: {
        insert: mockInsert,
      },
    });

    const params = { videoId: '123' };
    const formData = new FormData();
    formData.append('comment', 'Test comment');

    await postComment(params, formData);

    expect(mockInsert).toHaveBeenCalled();
  });

  it('should call comments.insert if commentId is provided', async () => {
    const mockInsert = jest.fn();
    (getYouTubeClient as jest.Mock).mockReturnValue({
      comments: {
        insert: mockInsert,
      },
    });

    const params = { commentId: '123' };
    const formData = new FormData();
    formData.append('comment', 'Test comment');

    await postComment(params, formData);

    expect(mockInsert).toHaveBeenCalled();
  });
});


describe('formDataToObject', () => {
  it('should convert FormData to a plain JavaScript object', () => {
    const formData = new FormData();
    formData.append('key1', 'value1');
    formData.append('key2', 'value2');

    const result = formDataToObject(formData);

    expect(result).toEqual({
      key1: 'value1',
      key2: 'value2',
    });
  });
});