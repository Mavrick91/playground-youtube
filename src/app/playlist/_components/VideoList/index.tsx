import { cn } from '~/lib/utils';
import Video from '~/app/playlist/_components/Video';
import { youtube_v3 } from 'googleapis';
import Button from '~/components/shared/Button';

type VideoListProps = {
  videos?: youtube_v3.Schema$Video[];
  handleUpdateChoice: (choice: 'liked' | 'disliked') => void;
  selectedChoice: 'liked' | 'disliked';
};

function VideoList({ videos, handleUpdateChoice, selectedChoice }: VideoListProps) {
  return (
    <div className="col-span-7">
      <div className="flex space-x-2 py-2">
        <Button
          className={cn('bg-black font-bold text-white', {
            'bg-purple-500': selectedChoice === 'liked',
          })}
          size="sm"
          onClick={() => handleUpdateChoice('liked')}
        >
          Liked
        </Button>
        <Button
          className={cn('bg-black font-bold text-white', {
            'bg-purple-500': selectedChoice === 'disliked',
          })}
          size="sm"
          onClick={() => handleUpdateChoice('disliked')}
        >
          Disliked
        </Button>
      </div>
      <div className="space-y-6 overflow-y-scroll h-screen w-screen">
        <div className="flex flex-col mb-44 py-1 rounded-lg">
          {videos && videos.map((video, index) => <Video key={video.id} video={video} index={index} />)}
        </div>
      </div>
    </div>
  );
}

export default VideoList;
