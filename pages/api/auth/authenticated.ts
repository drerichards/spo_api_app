// pages/api/auth/authenticated.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken } from '@/utils/getAccessToken';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const accessToken = getAccessToken(req, res);
    const authenticated = !!accessToken;
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.status(200).json({ authenticated });
}