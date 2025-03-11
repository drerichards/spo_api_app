// utils/getCSRFToken.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const cookies = parse(req.headers.cookie || '');
    const csrfToken = cookies.csrf_token;
    res.status(200).json({ csrfToken });
}