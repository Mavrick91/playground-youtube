import AuthenticatedUserCheck from '~/components/AuthenticatedUserCheck';
import MaxWidthWrapper from '~/components/MaxWidthWrapper';
import SearchBar from '~/components/SearchBar';
import TrendingVideos from '~/components/TrendingVideos';
import { FiltersProvider } from '~/providers/FiltersProvider';

export default function Home() {
  return (
    <main className="flex max-h-screen flex-col overflow-y-auto">
      <AuthenticatedUserCheck>
        <MaxWidthWrapper>
          <FiltersProvider>
            <SearchBar>
              <TrendingVideos />
            </SearchBar>
          </FiltersProvider>
        </MaxWidthWrapper>
      </AuthenticatedUserCheck>
    </main>
  );
}
