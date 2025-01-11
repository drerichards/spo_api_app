import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import spotifyAxios from "@/utils/spotifyAxios";

interface SpotifyUser {
    display_name: string;
    email: string;
    images: { url: string }[];
    id: string;
    country: string;
    product: string;
}

// Fetch the access token from the API
// This function is called by the `useQuery` hook to fetch the access token
// from the API. The `useQuery` hook will retry this function if it fails.
// The token is fetched from the "/api/auth/get-token" endpoint, which is
// responsible for fetching the access token from the cookies and returning it
// in the response body.
const fetchAccessToken = async (): Promise<string> => {
    const response = await fetch("/api/auth/get-token");
    if (!response.ok) {
        // If the response is not OK, throw an error
        // This will cause the `useQuery` hook to retry the function
        throw new Error("Failed to fetch access token");
    }
    const { accessToken } = await response.json();
    // Return the access token
    return accessToken;
};

// Fetch user data using the access token
// This function is called by the `useQuery` hook once the access token is available.
// The `useQuery` hook will retry this function if it fails.
//
// The function fetches the user data from the Spotify API using the access token.
// The `spotifyAxios` instance is used to make the request to the Spotify API.
// The `Authorization` header is set to `Bearer ${accessToken}`, which is the
// standard way to pass an access token to the Spotify API.
// The response is expected to be a JSON object containing the user data.
// If the response is not OK, an error is thrown.
// The `useQuery` hook will retry the function if an error is thrown.
const fetchUserData = async (accessToken: string): Promise<SpotifyUser> => {
    try {
        const response = await spotifyAxios.get<SpotifyUser>("/me", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        // Return the user data
        return response.data;
    } catch (error) {
        // If the response is not OK, throw an error
        // This will cause the `useQuery` hook to retry the function
        throw new Error(
            `Failed to fetch user data. Status code: ${(error as { response: { status: number } }).response.status
            }`
        );
    }
};

const Dashboard = () => {
    // Fetch the access token
    const {
        data: accessToken,
        isLoading: tokenLoading,
        error: tokenError,
    } = useQuery({
        queryKey: ["accessToken"],
        queryFn: fetchAccessToken,
    });

    // Fetch user data once the access token is available
    const {
        data: userData,
        isLoading: userLoading,
        error: userError,
    } = useQuery({
        queryKey: ["user", accessToken], // Unique query key based on access token
        queryFn: () => fetchUserData(accessToken as string),
        enabled: !!accessToken, // Only fetch user data if accessToken is available
    });

    if (tokenLoading || userLoading) return <p>Loading...</p>;
    if (tokenError || userError)
        return <p>Error: {tokenError?.message || userError?.message}</p>;

    return (
        <div>
            <h1>Dashboard</h1>
            {userData && (
                <div>
                    <p>Name: {userData.display_name}</p>
                    <p>Email: {userData.email}</p>
                    <Image
                        src={userData.images[0].url}
                        alt="Profile"
                        width={100}
                        height={100}
                        style={{ borderRadius: "50%" }}
                    />
                </div>
            )}
        </div>
    );
};

export default Dashboard;