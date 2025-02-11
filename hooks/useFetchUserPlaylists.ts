import spotifyAxios from '@/utils/spotifyAxios';
import { useQuery } from '@tanstack/react-query';
import { SpotifyPlaylist } from '@/types/store';

const fetchUserPlaylists = async (): Promise<SpotifyPlaylist[]> => {
  // let allPlaylists: SpotifyPlaylist[] = [];
  // let nextUrl: NullableString = `/me/playlists?limit=50`;

  // while (nextUrl) {
  //     const response: { data: { items: SpotifyPlaylist[]; next: NullableString } } = await spotifyAxios.get(nextUrl, {
  //         headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //         },
  //     });
  //     allPlaylists = allPlaylists.concat(response.data.items);
  //     nextUrl = response.data.next;
  // }

  const response = await spotifyAxios.get<{ items: SpotifyPlaylist[] }>(
    `/me/playlists?`
  );
  return response.data.items;
  // console.log(allPlaylists)
  // return [];
};

export const useFetchUserPlaylists = () => {
  return useQuery<SpotifyPlaylist[], Error>({
    queryKey: ['playlists'],
    queryFn: fetchUserPlaylists,
    staleTime: 1000 * 60 * 5,
  });
};
