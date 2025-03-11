// hooks/useFetchUserPlaylists.ts
import { SpotifyPlaylistData } from '@/types/store';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUserPlaylists = async (): Promise<SpotifyPlaylistData> => {
  const { data } = await axios.get('/api/user/playlists', {
    withCredentials: true,
  });
  return data;
};

export const useFetchUserPlaylists = () => {
  return useQuery({
    queryKey: ['playlists'],
    queryFn: fetchUserPlaylists,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
