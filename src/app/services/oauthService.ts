import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

const getOAuth2Client = async (): Promise<OAuth2Client> => {
  const authToken: RequestCookie | undefined = cookies().get('auth_token');
  const refreshToken: RequestCookie | undefined = cookies().get('refresh_token');

  if (!authToken || !refreshToken) {
    throw new Error('Not authenticated');
  }

  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  oAuth2Client.setCredentials({
    access_token: authToken.value,
    refresh_token: refreshToken.value,
  });

  if (oAuth2Client.isTokenExpiring()) {
    const { credentials } = await oAuth2Client.refreshAccessToken();

    oAuth2Client.setCredentials(credentials);

    cookies().set('auth_token', credentials.access_token!, {
      path: '/',
      httpOnly: true,
    });
    cookies().set('refresh_token', credentials.refresh_token!, {
      path: '/',
      httpOnly: true,
    });
  }

  return oAuth2Client;
};

export const getYouTubeClient = async () => {
  const oAuth2Client = await getOAuth2Client();

  return google.youtube({
    version: 'v3',
    auth: oAuth2Client,
  });
};
