import { OAuth2Client } from 'google-auth-library';
import { GetTokenResponse } from 'google-auth-library/build/src/auth/oauth2client';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { URL, URLSearchParams } from 'url';

export async function GET(req: NextRequest) {
  const oAuth2Client: OAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  const url: URL = new URL(req.nextUrl.toString());
  const searchParams: URLSearchParams = url.searchParams;

  const code: string | null = searchParams.get('code');
  const error: string | null = searchParams.get('error');

  if (error) {
    return NextResponse.json({ status: 401, message: 'Unauthorized: ' + error });
  }

  if (!code) {
    return NextResponse.json({ status: 400, message: 'No authorization code provided' });
  }

  try {
    const { tokens }: GetTokenResponse = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    if (!tokens.access_token) {
      return NextResponse.json({ status: 400, message: 'No access token returned from Google' });
    }

    const response: NextResponse = NextResponse.redirect('http://localhost:3000/');
    response.headers.set('Set-Cookie', `auth_token=${tokens.access_token}; Path=/; HttpOnly;`);

    return response;
  } catch (error: any) {
    console.error('Error exchanging code for tokens:', error.message);
    return NextResponse.json({ status: 500, message: 'Authentication failed' });
  }
}
