export default function ContentNoItems() {
  return (
    <section className="h-[500px] mb-32 flex flex-col items-center justify-center p-4" data-testid="content-no-items">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">No Items Found</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">We couldn't find any items. Please try again later.</p>
    </section>
  );
}
