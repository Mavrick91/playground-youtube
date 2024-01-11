import { cookies } from 'next/headers';
import { ReadonlyURLSearchParams } from 'next/navigation';
import ContainerVideoItems from '~/components/shared/ContainerVideoItems';
import { hasSearchQueryOrFilters } from '~/lib/url-utils';
import { YouTubeSearchListResponse } from '~/types/search';

// const delay = (ms: number) =>
//   new Promise((resolve, reject) =>
//     setTimeout(() => reject({ message: 'Failed to fetch data' }), ms)
//   );

// async function getData(
//   auth_token: string | undefined,
//   searchParams: ReadonlyURLSearchParams
// ) {
//   await delay(4000);

//   return {
//     finish: true,
//   };
// }

// create a function that add 2 numbers

async function getData(
  auth_token: string | undefined,
  searchParams: Record<string, string>
): Promise<YouTubeSearchListResponse> {
  const endpoint = hasSearchQueryOrFilters(searchParams)
    ? '/api/google/search'
    : '/api/google/trending';

  const url = new URL(endpoint, 'http://localhost:3000');
  const params = new URLSearchParams(searchParams);
  url.search = params.toString();

  const res = await fetch(url.toString(), {
    cache: 'no-cache',
    headers: {
      Cookie: `auth_token=${auth_token}`,
    },
  });

  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.message);
  }

  return responseData;
}

export default async function SearchedVideos({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const auth_token = cookies().get('auth_token')?.value;
  const data = await getData(auth_token, searchParams);

  return <ContainerVideoItems data={data} />;
}
