// pages/api/auth/logout.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createCookie } from '@/utils/createCookie';
import { parse } from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const cookies = parse(req.headers.cookie || '');
    const expectedToken = cookies.csrf_token;
    const csrfToken = req.headers['x-csrf-token'];

    if (!csrfToken || !expectedToken || csrfToken !== expectedToken) {
        return res.status(403).json({ error: 'CSRF token invalid' });
    }

    const cookieHeaders = [
        createCookie('spotify_access_token', '', 0),
        createCookie('spotify_refresh_token', '', 0),
        createCookie('spotify_auth_state', '', 0),
        createCookie('csrf_token', '', 0, false),
    ];
    res.setHeader('Set-Cookie', cookieHeaders);

    return res.status(200).json({ success: true, message: 'Logged out' });
}