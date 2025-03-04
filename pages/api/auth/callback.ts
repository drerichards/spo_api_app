// pages/api/auth/callback.ts
import { parse, serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });

  const cookies = parse(req.headers.cookie || '');
  const storedState = cookies.spotify_auth_state;
  const { state, code } = req.query;

  if (!state || state !== storedState) {
    return res.status(400).json({ error: 'Invalid state parameter' });
  }
  if (!code) return res.status(400).json({ error: 'Authorization code required' });

  try {
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
    if (!access_token || !refresh_token) {
      return res.status(500).json({ error: 'Invalid token response' });
    }

    res.setHeader('Set-Cookie', [
      serialize('spotify_access_token', access_token, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: expires_in,
      }),
      serialize('spotify_refresh_token', refresh_token, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30,
      }),
      serialize('spotify_auth_state', '', { path: '/', httpOnly: true, maxAge: 0 }),
    ]);

    return res.redirect('/user/library');
  } catch (error) {
    console.error('Callback error:', error);
    return res.status(500).json({ error: 'Failed to authenticate' });
  }
}