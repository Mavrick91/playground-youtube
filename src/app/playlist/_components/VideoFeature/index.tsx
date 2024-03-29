import { Play } from 'lucide-react';
import { cn, formatNumber } from '~/lib/utils';
import Button, { buttonVariants } from '~/components/shared/Button';
import React from 'react';
import { youtube_v3 } from 'googleapis';
import Link from 'next/link';
import ClientImage from '~/components/ClientImage';

type VideoFeatureProps = {
  video?: youtube_v3.Schema$VideoListResponse;
  selectedChoice: 'liked' | 'disliked';
};

function VideoFeature({ video, selectedChoice }: VideoFeatureProps) {
  return (
    <div className="col-span-3 relative overflow-hidden">
      <div
        className="absolute top-28 left-1/2 transform -translate-x-1/2 bg-no-repeat bg-center opacity-40 bg-gradient-to-b from-red-600 bg-fill"
        style={{
          height: '202px',
          width: '390px',
          backgroundImage: `url(${video?.items?.[0].snippet?.thumbnails?.high?.url || ''})`,
          aspectRatio: '360/202',
          filter: 'blur(20px)',
        }}
      />
      <div
        className="bg-slate-600/80 p-7 shrink-0 rounded-lg"
        style={{
          height: 'calc(100vh - 150px)',
        }}
      >
        <div className="space-y-6 z-10 relative">
          <Link
            href={`/watch?v=${video?.items?.[0].id}${selectedChoice === 'liked' ? '&list=LL' : ''}`}
            className="aspect-w-16 aspect-h-9 relative"
          >
            <ClientImage
              alt="Featured video"
              className="object-cover rounded-lg"
              height="202"
              src={video?.items?.[0].snippet?.thumbnails?.high?.url || ''}
              style={{
                aspectRatio: '360/202',
              }}
              width="360"
            />
            {selectedChoice === 'liked' && (
              <div
                data-testid="read-all"
                className="absolute opacity-0 hover:opacity-100 transition-opacity inset-0 rounded-lg text-white flex items-center justify-center gap-2 bg-black/60 h-full"
              >
                <Play width={20} fill="white" stroke="none" />

                <span className="text-xs font-medium">Read All</span>
              </div>
            )}
          </Link>
          <h2 className="text-2xl font-bold text-slate-900">{`Videos "${selectedChoice}"`}</h2>
          <div className="text-sm text-slate-900 flex flex-col gap-2">
            <p className="font-bold block">WonderWhizzes</p>
            <p>{formatNumber(`${video?.pageInfo?.totalResults}`)} vidéos • Aucune vue</p>
          </div>
          {selectedChoice === 'liked' && (
            <Link
              className={cn(buttonVariants({ variant: 'outline' }), 'mt-4')}
              href={`/watch?v=${video?.items?.[0].id}&list=LL`}
            >
              Read all
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoFeature;
