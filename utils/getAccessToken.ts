// utils/getAccessToken.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'cookie';
import { NullableString } from '@/types';

export const getAccessToken = (
  req: NextApiRequest,
  res: NextApiResponse
): NullableString => {
  const cookies = parse(req.headers.cookie || '');
  const accessToken = cookies.spotify_access_token;

  if (!accessToken) {
    res.status(401).json({ error: 'Unauthorized: No access token' });
    return null;
  }

  return accessToken;
};