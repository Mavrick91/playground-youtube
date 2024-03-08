export default function LoadingPlaylistVideoList() {
  return (
    <div className="w-full">
      <div className="border px-6 rounded-xl border-gray-300 pb-3">
        <div className="py-4 space-y-3">
          <div className="animate-pulse h-7 w-[200px] rounded-md bg-gray-300" />
          <div className="animate-pulse h-4 w-[100px] rounded-md bg-gray-300" />
        </div>
        <div className="flex flex-col gap-3 overflow-y-auto">
          {Array.from({ length: 5 }, (_, index) => index).map((num: number) => (
            <div className="flex space-y-2 col-span-3" key={num}>
              <div className="animate-pulse h-16 w-28 rounded-md bg-gray-300" />
              <div className="space-y-1 ml-2">
                <div className="animate-pulse h-4 w-[200px] rounded-md bg-gray-300" />
                <div className="animate-pulse h-3 w-[100px] rounded-md bg-gray-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
