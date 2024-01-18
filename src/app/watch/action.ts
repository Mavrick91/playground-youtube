'use server';

import { z } from 'zod';
import { getYouTubeClient } from '../services/oauthService';

const formDataSchema = z.object({
  comment: z.string().min(1, 'No comment provided'),
});

type Params = {
  videoId?: string;
  commentId?: string | null;
};

export const formDataToObject = (formData: FormData): Record<string, unknown> => {
  const object: Record<string, unknown> = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  return object;
};

export const postComment = async (params: Params, formData: FormData) => {
  const youtubeClient = await getYouTubeClient();
  const formDataObject = formDataToObject(formData);
  const parsedData = formDataSchema.safeParse(formDataObject);

  if (!parsedData.success) {
    return {
      status: 400,
      body: { message: parsedData.error.errors[0].message },
    };
  }

  const { comment } = parsedData.data;

  if (params.videoId)
    await youtubeClient.commentThreads.insert({
      part: ['snippet'],
      requestBody: {
        snippet: {
          videoId: params.videoId,
          topLevelComment: {
            snippet: {
              textOriginal: comment,
            },
          },
        },
      },
    });
  else if (params.commentId)
    await youtubeClient.comments.insert({
      part: ['snippet'],
      requestBody: {
        snippet: {
          parentId: params.commentId,
          textOriginal: comment,
        },
      },
    });

  return null;
};
