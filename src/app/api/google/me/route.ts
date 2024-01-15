import { GaxiosResponse } from 'gaxios';
import { google, people_v1 } from 'googleapis';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

interface Token {
  value: string;
}

export async function GET(): Promise<NextResponse> {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  const token: Token | undefined = cookies().get('auth_token');

  if (!token) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  oAuth2Client.setCredentials({ access_token: token.value });

  try {
    const people: people_v1.People = google.people({ version: 'v1', auth: oAuth2Client });
    const me: GaxiosResponse<people_v1.Schema$Person> = await people.people.get({
      resourceName: 'people/me',
      personFields: 'names,photos,emailAddresses',
    });

    return NextResponse.json(me.data, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Google API error:', error?.message);
    }
    return NextResponse.json({ message: 'Error fetching data from YouTube' }, { status: 500 });
  }
}
