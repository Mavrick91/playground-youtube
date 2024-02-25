interface Endpoint {
  endpoint: string;
  params: Record<string, string | number | boolean>;
}

export async function fetchData<T>(
  endpoint: string,
  params: Record<string, string | number | boolean> = {},
  options: RequestInit = {}
): Promise<T> {
  let authToken = null;
  const defaultOptions: RequestInit = options;

  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers');
    authToken = cookies().get('auth_token')?.value;
    defaultOptions.headers = {
      Cookie: `auth_token=${authToken}`,
    };
  } else {
    defaultOptions.credentials = 'include';
  }

  const definedParams = Object.entries(params).filter(([, value]) => value !== undefined);
  const urlParams = new URLSearchParams(definedParams.map(([key, value]) => [key, String(value)]));
  const url = new URL(endpoint, process.env.NEXT_PUBLIC_APP_URL);
  url.search = urlParams.toString();

  const response = await fetch(url, defaultOptions);
  if (!response.ok) {
    throw new Error('HTTP error');
  }
  return response.json();
}

export async function fetchAllData<T>(endpoints: Endpoint[], options: RequestInit = {}): Promise<T[]> {
  const requests = endpoints.map(({ endpoint, params }) => fetchData<T>(endpoint, params, options));
  return Promise.all(requests);
}
