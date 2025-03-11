// pages/api/user/playlists/[playlistId]/tracks.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getAccessToken } from '@/utils/getAccessToken';
import spotifyAxios from '@/utils/spotifyAxios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET')
    return res.status(405).json({ error: 'Method Not Allowed' });

  const accessToken = getAccessToken(req, res);
  if (!accessToken) return;

  const { playlistId } = req.query;
  if (!playlistId || typeof playlistId !== 'string') {
    return res.status(400).json({ error: 'Playlist ID is required' });
  }

  try {
    const response = await spotifyAxios.get(
      `/playlists/${playlistId}/tracks`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Error fetching playlist tracks:',
        error.response?.data || error.message
      );
      return res.status(error.response?.status || 500).json({
        error: error.response?.data?.error || 'Failed to fetch playlist tracks',
      });
    }

    console.error('Unexpected error:', (error as Error).message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
