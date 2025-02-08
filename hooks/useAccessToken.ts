import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import useAppStore from '@/store/appState'; // Import Zustand store

// Fetch the access token
const fetchAccessToken = async (): Promise<string> => {
    const response = await fetch("/api/auth/get-token");
    if (!response.ok) {
        window.location.href = "/";
        return Promise.reject("Redirected to home page due to failed token fetch");
    }
    const { accessToken } = await response.json();
    return accessToken;
};

// Hook to fetch and manage the access token
export const useAccessToken = () => {
    const setAccessToken = useAppStore((state) => state.setAccessToken);

    const query = useQuery<string, Error>({
        queryKey: ["accessToken"],
        queryFn: fetchAccessToken,
        onSuccess: (token: string) => {
            setAccessToken(token); // Update Zustand state
        },
        staleTime: Infinity, // Prevent refetching once token is fetched
        cacheTime: Infinity, // Cache token indefinitely
    } as UseQueryOptions<string, Error>);

    return query;
};

