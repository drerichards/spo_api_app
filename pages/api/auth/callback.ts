import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { createCookie } from '@/utils/setCookie';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code not found' });
  }

  try {
    // Exchange the authorization code for an access token
    const tokenResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code as string,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString('base64')}`,
        },
      }
    );

    const { access_token, refresh_token, expires_in } = tokenResponse.data;

    // ✅ Store tokens in HTTP-only cookies
    res.setHeader('Set-Cookie', [
      createCookie('spotify_access_token', access_token, expires_in),
      createCookie('spotify_refresh_token', refresh_token, 60 * 60 * 24 * 30), // 30 days
    ]);

    // ✅ Redirect user to dashboard after login
    res.redirect('/user/dashboard');
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // if error is an instance of an Axios error
      console.error(
        'Error exchanging authorization code:',
        error.response?.data || error.message
      );
    } else {
      console.error('Error exchanging authorization code:', error);
    }
    res.status(500).json({ error: 'Failed to exchange authorization code' });
  }
}
