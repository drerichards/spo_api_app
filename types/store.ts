export interface AppState {
    accessToken: string | null;
    setAccessToken: (token: string) => void;

    userData: SpotifyUser | null;
    setUserData: (data: SpotifyUser) => void;

    currentTrack: SpotifyTrack | null;
    setCurrentTrack: (track: SpotifyTrack) => void;

    userPlaylists: SpotifyPlaylist[];
    setUserPlaylists: (playlists: SpotifyPlaylist[]) => void;

    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

export interface SpotifyUser {
    display_name: string;
    email: string;
    images: { url: string }[];
    id: string;
    country: string;
}

export interface SpotifyTrack {
    id: string;
    name: string;
    href: string;
    duration_ms: number;
    preview_url?: string;
    is_playable: boolean;
    popularity: number;
    album: {
        id: string;
        type: string;
        images: { url: string }[];
    };
    artists: {
        id: string;
        type: string;
        name: string;
    }[];
}

export interface SpotifyPlaylist {
    id: string;
    name: string;
    description: string;
    images: { url: string }[];
    tracks: {
        total: number;
        items?: SpotifyTrack[];
    };
}
