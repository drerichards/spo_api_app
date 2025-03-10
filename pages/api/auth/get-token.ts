// pages/api/auth/get-token.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken } from '@/utils/getAccessToken';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const accessToken = getAccessToken(req, res);
  if (!accessToken) return;

  res.status(200).json({ accessToken });
}