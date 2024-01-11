import { Skeleton } from '~/components/shared/Skeleton';

export default function Loading() {
  return (
    <div className="grid grid-cols-4 gap-y-10 gap-x-4">
      {Array.from({ length: 7 }).map((_, index) => (
        <Skeleton.youtubeVideo key={index} />
      ))}
    </div>
  );
}
