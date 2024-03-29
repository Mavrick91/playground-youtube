import { OAuth2Client } from 'google-auth-library';
import { GetTokenResponse } from 'google-auth-library/build/src/auth/oauth2client';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { URL } from 'url';

export async function GET(req: NextRequest) {
  const oAuth2Client: OAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  const url: URL = new URL(req.nextUrl.toString());
  const { searchParams } = url;

  const code: string | null = searchParams.get('code');
  const error: string | null = searchParams.get('error');

  if (error) {
    return NextResponse.json({ status: 401, message: `Unauthorized: ${error}` });
  }

  if (!code) {
    return NextResponse.json({ status: 400, message: 'No authorization code provided' });
  }

  try {
    const { tokens }: GetTokenResponse = await oAuth2Client.getToken(code);

    if (!tokens.access_token) {
      return NextResponse.json({ status: 400, message: 'No access token returned from Google' });
    }

    const response: NextResponse = NextResponse.redirect('http://localhost:3000/');

    cookies().set('auth_token', tokens.access_token, {
      path: '/',
      httpOnly: true,
    });
    cookies().set('refresh_token', tokens.refresh_token!, {
      path: '/',
      httpOnly: true,
    });

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error exchanging code for tokens:', error.message);
    }
    return NextResponse.json({ message: 'Error fetching data from YouTube' }, { status: 500 });
  }
}
