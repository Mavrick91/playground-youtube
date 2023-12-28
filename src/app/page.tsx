import AuthenticatedUserCheck from '~/components/AuthenticatedUserCheck';
import MaxWidthWrapper from '~/components/MaxWidthWrapper';
import SearchBar from '~/components/SearchBar';
import TrendingVideos from '~/components/TrendingVideos';

export default function Home() {
  return (
    <main className="flex max-h-screen flex-col overflow-y-auto">
      <AuthenticatedUserCheck>
        <MaxWidthWrapper>
          <SearchBar>
            <TrendingVideos />
          </SearchBar>
        </MaxWidthWrapper>
      </AuthenticatedUserCheck>
    </main>
  );
}
