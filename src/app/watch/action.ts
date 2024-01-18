'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { getYouTubeClient } from '../services/oauthService';

const formDataSchema = z.object({
  comment: z.string().min(1, 'No comment provided'),
});

export const postComment = async (videoId: string, formData: FormData) => {
  const youtubeClient = getYouTubeClient();
  const parsedData = formDataSchema.safeParse(formData);

  if (!parsedData.success) {
    return {
      status: 400,
      body: { message: parsedData.error.errors[0].message },
    };
  }

  const { comment } = parsedData.data;

  youtubeClient.commentThreads.insert({
    part: ['snippet'],
    requestBody: {
      snippet: {
        videoId,
        topLevelComment: {
          snippet: {
            textOriginal: comment,
          },
        },
      },
    },
  });

  revalidatePath(`/watch?v=${videoId}`);

  return null;
};
