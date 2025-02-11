import useAppStore from '@/store/appState';
import { SpotifyUser } from '@/types/store';
import spotifyAxios from '@/utils/spotifyAxios';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

const fetchUserData = async (): Promise<SpotifyUser> => {
  const response = await spotifyAxios.get<SpotifyUser>('/me');
  return response.data;
};

export const useUserData = () => {
  const setUserData = useAppStore(state => state.setUserData);
  const query = useQuery<SpotifyUser, Error>({
    queryKey: ['user'],
    queryFn: fetchUserData,
    onSuccess: (data: SpotifyUser) => setUserData(data),
    staleTime: 1000 * 60 * 5,
  } as UseQueryOptions<SpotifyUser, Error>);

  return query;
};
