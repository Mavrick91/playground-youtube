'use client';

import { youtube_v3 } from 'googleapis';
import ReactPlayer from 'react-player';

type Props = {
  video?: youtube_v3.Schema$Video;
};

export default function YoutubePlayer({ video }: Props) {
  if (!video?.id) return null;

  return (
    <div>
      <div className="h-full aspect-video">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${video?.id}`}
          controls
          width="100%"
          height="100%"
          config={{
            youtube: {
              playerVars: {
                // autoplay: 1,
              },
            },
          }}
        />
      </div>
      <div className="mt-3">
        <span className="text-xl text-black font-bold">{video?.snippet?.title}</span>
      </div>
    </div>
  );
}
