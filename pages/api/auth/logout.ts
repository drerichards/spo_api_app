// pages/api/auth/logout.ts
import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('Logout request:', { method: req.method, cookies: req.headers.cookie });
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' }); // Enforce POST
    }

    res.setHeader('Set-Cookie', [
        serialize('spotify_access_token', '', { path: '/', httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 0 }),
        serialize('spotify_refresh_token', '', { path: '/', httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 0 }),
        serialize('spotify_auth_state', '', { path: '/', httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 0 }),
    ]);

    return res.status(200).json({ success: true, message: 'Logged out' });
}