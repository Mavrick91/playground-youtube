import AuthenticatedUserCheck from '~/components/AuthenticatedUserCheck';
import TrendingVideos from '~/components/TrendingVideos';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <AuthenticatedUserCheck>
        <TrendingVideos />
      </AuthenticatedUserCheck>
    </main>
  );
}
