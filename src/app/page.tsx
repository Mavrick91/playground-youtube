import { Suspense } from 'react';
import ErrorBoundary from '~/components/ErrorBoundary';
import FilterGroup from '~/components/FilterGroup';
import VideoSearchAndTrending from '~/components/VideoSearchAndTrending';
import { searchLoading } from '~/constants/loading';

export default function Home({ searchParams }: { searchParams: Record<string, string> }) {
  return (
    <main className="flex max-h-screen flex-col overflow-y-auto">
      <div className="my-5 flex-col gap-5 flex">
        <FilterGroup />
        <ErrorBoundary>
          <Suspense fallback={searchLoading}>
            <VideoSearchAndTrending searchParams={searchParams} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </main>
  );
}
