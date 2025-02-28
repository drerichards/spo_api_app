import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { createCookie } from '@/utils/setCookie';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { code } = req.query;

  if (!code) {
    console.error('❌ Authorization code is missing');
    return res.status(400).json({ error: 'Authorization code is required' });
  }

  try {
    // ✅ Exchange authorization code for access + refresh tokens
    const tokenResponse = await axios.post<{
      access_token: string;
      refresh_token: string;
      expires_in: number;
    }>(
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
      console.error(
        '❌ Missing tokens from Spotify API response:',
        tokenResponse.data
      );
      return res
        .status(500)
        .json({ error: 'Invalid token response from Spotify' });
    }

    // ✅ Store tokens securely in HTTP-only cookies
    res.setHeader('Set-Cookie', [
      createCookie('spotify_access_token', access_token, expires_in),
      createCookie('spotify_refresh_token', refresh_token, 60 * 60 * 24 * 30), // 30 days
    ]);

    return res.redirect('/user/library');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        '🔥 Callback API Error:',
        error.response?.data || error.message
      );
      return res.status(error.response?.status || 500).json({
        error:
          error.response?.data?.error ||
          'Failed to exchange authorization code',
      });
    }

    console.error('🔥 Unexpected Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
