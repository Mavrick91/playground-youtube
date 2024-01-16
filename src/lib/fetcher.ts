import { cookies } from 'next/headers';

interface Endpoint {
  endpoint: string;
  params: Record<string, string | number | boolean>;
}

export async function fetchData<T>(
  endpoint: string,
  params: Record<string, string | number | boolean> = {},
  options: RequestInit = {},
): Promise<T> {
  const authToken = cookies().get('auth_token')?.value;

  const defaultOptions: RequestInit = {
    credentials: 'include',
    headers: {
      Cookie: `auth_token=${authToken}`,
    },
    ...options,
  };

  const definedParams = Object.entries(params).filter(([_, value]) => value !== undefined);
  const urlParams = new URLSearchParams(definedParams.map(([key, value]) => [key, String(value)]));
  const url = new URL(endpoint, process.env.NEXT_PUBLIC_APP_URL);
  url.search = urlParams.toString();

  const response = await fetch(url, defaultOptions);
  if (!response.ok) {
    throw new Error('HTTP error');
  }
  const jsonResponse = await response.json();
  return jsonResponse.data;
}

export async function fetchAllData<T>(
  endpoints: Endpoint[],
  options: RequestInit = {}
): Promise<T[]> {
  const requests = endpoints.map(({ endpoint, params }) => fetchData<T>(endpoint, params, options));
  return Promise.all(requests);
}
