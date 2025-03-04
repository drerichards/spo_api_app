// pages/api/auth/token.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = parse(req.headers.cookie || '');
  const accessToken = cookies.spotify_access_token;

  console.log('Token request cookies:', cookies);

  if (!accessToken) {
    return res.status(401).json({ error: 'Access token missing' });
  }

  res.status(200).json({ accessToken });
}