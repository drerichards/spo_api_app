// pages/api/auth/callback.ts
import { parse } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import useAppStore from '@/store/appState';
import { createCookie } from '@/utils/createCookie';
import crypto from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });

  const cookies = parse(req.headers.cookie || '');
  const storedState = cookies.spotify_auth_state;
  const { state, code } = req.query;

  if (!state || state !== storedState) {
    console.error('Invalid state parameter');
    res.setHeader('Set-Cookie', createCookie('spotify_auth_state', '', 0));
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    return res.redirect('/');
  }
  if (!code) {
    console.error('Authorization code required');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    return res.redirect('/');
  }

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
      console.error('Invalid token response');
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      return res.redirect('/');
    }

    const csrfToken = crypto.randomBytes(32).toString('hex');

    useAppStore.getState().setTokenExpiresIn(expires_in);

    const cookieHeaders = [
      createCookie('spotify_access_token', access_token, expires_in),
      createCookie('spotify_refresh_token', refresh_token, 60 * 60 * 24 * 30),
      createCookie('spotify_auth_state', '', 0),
      createCookie('csrf_token', csrfToken, 60 * 60 * 24 * 30, false),
    ];
    res.setHeader('Set-Cookie', cookieHeaders);

    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    return res.redirect('/user/library');
  } catch (error) {
    console.error('Callback error:', error);
    res.setHeader('Set-Cookie', createCookie('spotify_auth_state', '', 0));
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    return res.redirect('/');
  }
}