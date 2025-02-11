import { NullableString } from '@/types';
import { SpotifyTrack } from '@/types/store';
import spotifyAxios from '@/utils/spotifyAxios';
import { useQuery } from '@tanstack/react-query';

const fetchPlaylistTracks = async (
  playlistId: string
): Promise<SpotifyTrack[]> => {
  if (!playlistId) throw new Error('Playlist ID is required');

  const response = await spotifyAxios.get<{ items: { track: SpotifyTrack }[] }>(
    `/playlists/${playlistId}/tracks`
  );

  return response.data.items.map(item => item.track);
};

export const useFetchPlaylistTracks = (playlistId: NullableString) => {
  const query = useQuery<SpotifyTrack[], Error>({
    queryKey: ['playlistTracks', playlistId],
    queryFn: () => fetchPlaylistTracks(playlistId as string),
    enabled: !!playlistId,
    staleTime: 1000 * 60 * 5,
  });

  return query;
};
