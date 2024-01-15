import { cookies } from 'next/headers';
import React from 'react';
import data from './data.json';
import YoutubePlayer from '~/components/YoutubePlayer';
import { YoutubeVideo } from '~/types/videos';
import DescriptionVideo from '~/components/DescriptionVideo';

async function getData(
  auth_token: string | undefined,
  searchParams: Record<string, string>
): Promise<YoutubeVideo> {
  const url = new URL('/api/youtube/videos', process.env.NEXT_PUBLIC_APP_URL);
  const params = new URLSearchParams(searchParams);
  url.search = params.toString();

  const res = await fetch(url.toString(), {
    cache: 'no-cache',
    headers: {
      Cookie: `auth_token=${auth_token}`,
    },
  });

  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.message);
  }

  return responseData;
}

export default async function WatchPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const auth_token = cookies().get('auth_token')?.value;
  // const data = await getData(auth_token, searchParams);
  // console.log('🚀 ~ data:', JSON.stringify(data));
  const video = data.items[0];

  return (
    <div className="overflow-auto">
      <div className="flex pt-6">
        <div className="pr-6 w-9/12">
          <YoutubePlayer video={data.items[0]} />
          <DescriptionVideo
            description={video.snippet.description}
            publishedAt={video.snippet.publishedAt}
            viewCount={video.statistics.viewCount}
          />
        </div>
        <div className="border border-red-500 w-3/12">test</div>
      </div>
    </div>
  );
}
