// store/appState.ts
export interface AppState {
  userData: SpotifyUser | null;
  setUserData: (data: SpotifyUser | null) => void;

  currentTrack: SpotifyTrack | null;
  setCurrentTrack: (track: SpotifyTrack | null) => void;

  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;

  volume: number;
  setVolume: (volume: number) => void;

  playbackQueue: ReadonlyArray<SpotifyTrack>;
  setPlaybackQueue: (queue: SpotifyTrack[]) => void;
  addToQueue: (track: SpotifyTrack) => void;
  removeFromQueue: (trackId: string) => void;

  userPlaylists: ReadonlyArray<SpotifyPlaylist>;
  setUserPlaylists: (playlists: SpotifyPlaylist[]) => void;

  theme: 'light' | 'dark';
  toggleTheme: () => void;

  isLoggingOut: boolean;
  tokenExpiresIn: number;
  setTokenExpiresIn: (expiresIn: number) => void;
}

export interface SpotifyUser {
  display_name: string;
  email: string;
  images: { url: string }[];
  id: string;
  country: string;
  followers?: { total: number };
  external_urls?: { spotify: string };
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

export interface SpotifyPlaylistData {
  limit: number;
  offset: number;
  previous: string | null;
  total: number;
  items: SpotifyPlaylist[];
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
