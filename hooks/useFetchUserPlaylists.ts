import spotifyAxios from "@/utils/spotifyAxios";
import { useQuery } from "@tanstack/react-query";
import { SpotifyPlaylist } from "@/types/store";
import { NullableString, OptionalString } from "@/types";

const fetchUserPlaylists = async (accessToken: string): Promise<SpotifyPlaylist[]> => {
    let allPlaylists: SpotifyPlaylist[] = [];
    let nextUrl: NullableString = `/me/playlists?limit=50`;

    while (nextUrl) {
        const response: { data: { items: SpotifyPlaylist[]; next: NullableString } } = await spotifyAxios.get(nextUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        allPlaylists = allPlaylists.concat(response.data.items);
        nextUrl = response.data.next;
    }
    console.log(allPlaylists)
    return [];
};

export const useFetchUserPlaylists = (accessToken: OptionalString) => {
    return useQuery<SpotifyPlaylist[], Error>({
        queryKey: ["playlists", accessToken],
        queryFn: () => fetchUserPlaylists(accessToken as string),
        enabled: !!accessToken, // Only fetch if accessToken exists
        staleTime: 1000 * 60 * 5,
    });
};