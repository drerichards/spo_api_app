import spotifyAxios from "@/utils/spotifyAxios";
import { useQuery } from "@tanstack/react-query";
import { SpotifyPlaylist } from "@/types";

const fetchUserPlaylists = async (accessToken: string): Promise<SpotifyPlaylist[]> => {
    const response = await spotifyAxios.get<{ items: SpotifyPlaylist[] }>('/me/playlists', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data.items;
};

export const useFetchUserPlaylists = (accessToken: string | undefined) => {
    return useQuery<SpotifyPlaylist[], Error>({
        queryKey: ["playlists", accessToken],
        queryFn: () => fetchUserPlaylists(accessToken as string),
        enabled: !!accessToken, // Only fetch if accessToken exists
        staleTime: 1000 * 60 * 5,
    });
};