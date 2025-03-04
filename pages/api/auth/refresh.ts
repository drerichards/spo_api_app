// pages/api/auth/refresh.ts
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { parse, serialize } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = parse(req.headers.cookie || '');
  const refreshToken = cookies.spotify_refresh_token;

  if (!refreshToken) {
    return res.redirect(307, '/api/auth/login');
  }

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      null,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        },
      }
    );

    const { access_token, expires_in } = response.data;
    res.setHeader('Set-Cookie', [
      serialize('spotify_access_token', access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: expires_in,
        path: '/',
      }),
    ]);

    res.redirect(302, '/');
  } catch (error) {
    console.error('Refresh error:', error);
    res.status(500).json({ error: 'Failed to refresh token' });
  }
}