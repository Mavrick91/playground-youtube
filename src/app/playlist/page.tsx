import MaxWidthWrapper from '~/components/MaxWidthWrapper';
import { getVideosDetails } from '~/services/videoService';
import VideoRatingsDisplay from '~/app/playlist/_components/VideoRatingsDisplay';

const Playlist = async () => {
  const likedVideos = await getVideosDetails({ myRating: 'like', maxResults: 15 });
  const dislikedVideos = await getVideosDetails({ myRating: 'dislike', maxResults: 15 });

  return (
    <MaxWidthWrapper>
      <div className="py-6">
        <VideoRatingsDisplay likedVideos={likedVideos} dislikedVideos={dislikedVideos} />
      </div>
    </MaxWidthWrapper>
  );
};

export default Playlist;
