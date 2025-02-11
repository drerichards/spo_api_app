import { AppState, SpotifyPlaylist, SpotifyTrack, SpotifyUser } from '@/types';
import { create } from 'zustand';

const useAppStore = create<AppState>(set => ({
  accessToken: null,
  setAccessToken: token => set({ accessToken: token }),

  userData: null,
  setUserData: (data: SpotifyUser) => set({ userData: data }),

  currentTrack: null,
  setCurrentTrack: (track: SpotifyTrack) => set({ currentTrack: track }),

  userPlaylists: [],
  setUserPlaylists: (playlists: SpotifyPlaylist[]) =>
    set({ userPlaylists: playlists }),

  theme: 'light',
  toggleTheme: () =>
    set(state => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));

export default useAppStore;
