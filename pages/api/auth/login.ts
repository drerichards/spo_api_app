// pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import { createCookie } from '@/utils/createCookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const state = crypto.randomBytes(16).toString('hex');

  res.setHeader('Set-Cookie', createCookie('spotify_auth_state', state, 300));

  const scopes = [
    'user-read-private',
    'user-read-email',
    'playlist-read-private',
    'playlist-read-collaborative',
  ].join(' ');

  const queryParams = new URLSearchParams({
    client_id: process.env.SPOTIFY_CLIENT_ID!,
    response_type: 'code',
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
    scope: scopes,
    state,
    show_dialog: 'true',
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams.toString()}`);
}
// TODO: clicking cancel to spot auth should redirect to home