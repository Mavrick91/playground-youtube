import FilterGroup from '~/components/FilterGroup';

export default function Home() {
  return (
    <main className="flex max-h-screen flex-col overflow-y-auto">
      <div className="my-5">
        <FilterGroup />
      </div>
    </main>
  );
}
