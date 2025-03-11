// hooks/useFetchUserPlaylistTracks.ts
import { NullableString } from '@/types';
import { SpotifyTrack } from '@/types/store';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUserPlaylistTracks = async (
  playlistId: string
): Promise<SpotifyTrack[]> => {
  if (!playlistId) throw new Error('Playlist ID is required');

  const { data } = await axios.get<{ items: { track: SpotifyTrack }[] }>(
    `/api/user/playlists/${playlistId}/tracks`,
    { withCredentials: true }
  );

  return data.items.map(item => item.track);
};

export const useFetchUserPlaylistTracks = (playlistId: NullableString) => {
  return useQuery({
    queryKey: ['playlistTracks', playlistId],
    queryFn: () => fetchUserPlaylistTracks(playlistId as string),
    enabled: Boolean(playlistId),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
