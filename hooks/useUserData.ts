import useAppStore from "@/store/appState";
import { OptionalString } from "@/types";
import { SpotifyUser } from "@/types/store";
import spotifyAxios from "@/utils/spotifyAxios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

// Fetch user data using the access token
const fetchUserData = async (accessToken: string): Promise<SpotifyUser> => {
    const response = await spotifyAxios.get<SpotifyUser>('/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};

// Hook to fetch user data and sync with AppState
export const useUserData = (accessToken: OptionalString) => {
    const setUserData = useAppStore(state => state.setUserData); // Zustand function

    const query = useQuery<SpotifyUser, Error>({
        queryKey: ["user", accessToken],
        queryFn: () => fetchUserData(accessToken as string),
        enabled: !!accessToken, // Only fetch if accessToken exists
        onSuccess: (data: SpotifyUser) => {
            setUserData(data); // Update Zustand state
        },
        staleTime: 1000 * 60 * 5,
    } as UseQueryOptions<SpotifyUser, Error>);

    return query;
};

