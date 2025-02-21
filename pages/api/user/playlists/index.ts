import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getAccessToken } from '@/utils/getAccessToken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET')
    return res.status(405).json({ error: 'Method Not Allowed' });

  const accessToken = getAccessToken(req, res);
  if (!accessToken) return;

  try {
    const response = await axios.get(
      'https://api.spotify.com/v1/me/playlists',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Error fetching user data:',
        error.response?.data || error.message
      );
      return res.status(error.response?.status || 500).json({
        error: error.response?.data?.error || 'Failed to fetch user data',
      });
    }

    console.error('Unexpected error:', (error as Error).message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
