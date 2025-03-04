import { useFetchUserPlaylistTracks } from '@/hooks/useFetchUserPlaylistTracks';
import { Divider, CloseButton } from '@chakra-ui/react'
import {
  PanelContainer,
  PanelHeader,
  PanelTitle,
  TrackList,
  TrackItem,
} from '../styles/css-panelRight';
import { ToolkitSpinner } from '@/components/_uiToolkit/ui';

interface PlaylistPanelProps {
  playlistId: string;
  onClose: () => void;
}

const PlaylistPanel = ({ playlistId, onClose }: PlaylistPanelProps) => {
  const { data: tracks, isLoading, error } = useFetchUserPlaylistTracks(playlistId);

  return (
    <PanelContainer id={`playlist-panel-${playlistId}`}>
      <PanelHeader>
        <PanelTitle>Playlist Tracks</PanelTitle>
        <CloseButton
          aria-label="Close Playlist"
          onClick={onClose}
        />
      </PanelHeader>
      <Divider />

      {isLoading && <ToolkitSpinner />}

      {error && <PanelTitle>Error: {error.message}</PanelTitle>}
      {tracks && tracks.length === 0 && <PanelTitle>No tracks available.</PanelTitle>}

      <TrackList>
        {tracks?.map((track, index) => (
          <TrackItem key={index}>{track.name}</TrackItem>
        ))}
      </TrackList>
    </PanelContainer>
  );
};

export default PlaylistPanel;