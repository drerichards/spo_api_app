import { OptionalString } from "@/types";
import { SpotifyTrack } from "@/types/store";
import spotifyAxios from "@/utils/spotifyAxios";
import { useQuery } from "@tanstack/react-query";

const fetchPlaylistTracks = async (accessToken: string, playlistId: string): Promise<SpotifyTrack[]> => {
    const response = await spotifyAxios.get<{ items: SpotifyTrack[] }>(
        `/api/playlist/${playlistId}/tracks`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data.items;;
};

export const useFetchPlaylistTracks = (accessToken: OptionalString, playlistId: string) => {
    const query = useQuery<SpotifyTrack[], Error>({
        queryKey: ["playlistTracks", playlistId],
        queryFn: () => fetchPlaylistTracks(accessToken as string, playlistId),
        enabled: !!accessToken && !!playlistId,
        staleTime: 1000 * 60 * 5,
    });

    return query;
}