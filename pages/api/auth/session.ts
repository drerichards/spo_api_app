import { parse } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const cookies = parse(req.headers.cookie || '');

    if (cookies.spotify_access_token) {
        return res.status(200).json({ authenticated: true });
    } else {
        return res.status(200).json({ authenticated: false });
    }
}