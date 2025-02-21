import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const state = crypto.randomBytes(16).toString('hex'); // Secure random state

  res.setHeader(
    'Set-Cookie',
    serialize('spotify_auth_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 300, // Valid for 5 minutes
    })
  );
  const scopes = [
    'user-read-private',
    'user-read-email',
    'playlist-read-private',
    'playlist-read-collaborative',
  ].join(' ');

  if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_REDIRECT_URI) {
    return res.status(500).json({ error: 'Missing Spotify credentials' });
  }

  const queryParams = new URLSearchParams({
    client_id: process.env.SPOTIFY_CLIENT_ID,
    response_type: 'code',
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    scope: scopes,
    state, // CSRF protection
    show_dialog: 'true', // Force reauthorization
  });

  res.redirect(
    `https://accounts.spotify.com/authorize?${queryParams.toString()}`
  );
}
