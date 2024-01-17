import { google } from 'googleapis';
import { cookies } from 'next/headers';

interface Token {
  value: string;
}

const getOAuth2Client = () => {
  const token: Token | undefined = cookies().get('auth_token');

  if (!token) {
    throw new Error('Not authenticated');
  }

  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  oAuth2Client.setCredentials({ access_token: token.value });

  return oAuth2Client;
};

export const getYouTubeClient = () => {
  const oAuth2Client = getOAuth2Client();

  return google.youtube({
    version: 'v3',
    auth: oAuth2Client,
  });
};
