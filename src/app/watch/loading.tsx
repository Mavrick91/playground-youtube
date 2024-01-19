import { Separator } from '~/components/Separator';

export default function Loading() {
  return (
    <div className="py-6 w-9/12">
      <div className="flex flex-col">
        <div className="animate-pulse h-[511px] rounded-md bg-gray-300" />
        <div className="mt-3 flex flex-col">
          <div className="animate-pulse h-6 rounded-md bg-gray-300" />
          <div className="flex gap-2 items-start my-2 h-10 w-1/2">
            <div className="animate-pulse h-9 w-9 shrink-0 rounded-full bg-gray-300" />
            <div className="flex flex-col w-full gap-2">
              <div className="animate-pulse h-4 rounded-md bg-gray-300" />
              <div className="animate-pulse h-4 rounded-md bg-gray-300" />
            </div>
          </div>
        </div>
        <div className="mt-3">
          <div className="animate-pulse h-28 rounded-md bg-gray-300" />
          <Separator className="my-8" />
          <div className="flex gap-5">
            <div className="animate-pulse  w-1/5 h-8 rounded-md bg-gray-300" />
            <div className="animate-pulse h-8 rounded-md bg-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
