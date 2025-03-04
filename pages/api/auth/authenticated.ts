// pages/api/auth/authenticated.ts
import { parse } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const cookies = parse(req.headers.cookie || '');
    res.status(200).json({ authenticated: !!cookies.spotify_access_token });
}