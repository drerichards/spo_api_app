import { SpotifyPlaylist, SpotifyPlaylistData } from '@/types/store';
import {
  PlaylistListContainer,
  PlaylistItem,
  PlaylistImage,
  PlaylistName,
} from '../styles/css-panelRight';
interface PlaylistListProps {
  playlists: SpotifyPlaylistData;
  onSelectPlaylist: (id: string) => void;
}

const PlaylistList = ({ playlists, onSelectPlaylist }: PlaylistListProps) => {
  return (
    <PlaylistListContainer id='playlist-list'>
      {playlists.items.map((playlist: SpotifyPlaylist) => (
        <PlaylistItem
          key={playlist.id}
          onClick={() => onSelectPlaylist(playlist.id)}
        >
          <PlaylistImage
            src={playlist.images[0]?.url || '/fallback-image.png'}
            alt={playlist.name}
            boxSize="40px"
          />
          <PlaylistName>{playlist.name}</PlaylistName>
        </PlaylistItem>
      ))}
    </PlaylistListContainer>
  );
};

export default PlaylistList;
