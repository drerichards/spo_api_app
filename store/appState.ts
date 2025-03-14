// store/appState.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, SpotifyPlaylist, SpotifyTrack, SpotifyUser } from '@/types/store';

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      userData: null as SpotifyUser | null,
      setUserData: (data: SpotifyUser | null) => set({ userData: data }),

      userPlaylists: [],
      setUserPlaylists: (playlists: SpotifyPlaylist[]) => set({ userPlaylists: playlists }),

      currentTrack: null,
      setCurrentTrack: (track: SpotifyTrack | null) => set({ currentTrack: track }),

      isPlaying: false,
      setIsPlaying: (isPlaying) => set({ isPlaying }),

      volume: 50,
      setVolume: (volume) => set({ volume }),

      playbackQueue: [],
      setPlaybackQueue: (queue) => set({ playbackQueue: [...queue] }),

      addToQueue: (track: SpotifyTrack) =>
        set((state) => {
          if (state.playbackQueue.some((t) => t.id === track.id)) return state;
          return { playbackQueue: [...state.playbackQueue, track] };
        }),

      removeFromQueue: (trackId: string) =>
        set((state) => ({
          playbackQueue: state.playbackQueue.filter((track) => track.id !== trackId),
        })),

      theme: 'light',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

      isLoggingOut: false,
      tokenExpiresIn: 0,
      setTokenExpiresIn: (expiresIn: number) => set({ tokenExpiresIn: expiresIn }),
    }),
    {
      name: 'app-state',
      partialize: (state) => ({
        userData: state.userData,
        theme: state.theme,
        tokenExpiresIn: state.tokenExpiresIn,
      }),
    }
  )
);

export default useAppStore;
