import { useState } from 'react';
import { Text, Divider } from '@chakra-ui/react';
import { useFetchUserPlaylists } from '@/hooks/useFetchUserPlaylists';
import PlaylistPanel from '@/components/panel_right/playlist/PlaylistPanel';
import {
  LibraryContainer,
  PlaylistListContainer,
  PlaylistItem,
  PlaylistImage,
  PlaylistName,
  PlaylistList,
  SlidingPanel,
} from './styles/css-library';
import { NullableString } from '@/types';
import {
  ScrollableContainer,
  ScrollableSection,
} from '@/components/layout/styles/css-layout';
import { ToolkitSpinner } from '@/components/_uiToolkit/ui';

const LibraryPage = () => {
  const { data: playlists, isLoading, error } = useFetchUserPlaylists();
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<NullableString>(null);

  if (isLoading) return <ToolkitSpinner />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <LibraryContainer id='library-page'>
      <PlaylistListContainer animate={{ flex: selectedPlaylistId ? 0.73 : 1.2 }}>
        <ScrollableContainer>
          <ScrollableSection>
            <Text
              fontSize="2xl"
              fontWeight="bold"
            >
              Your Playlists
            </Text>
            <Divider />

            <PlaylistList>
              {playlists?.items?.map(playlist => (
                <PlaylistItem
                  key={playlist.id}
                  onClick={() => setSelectedPlaylistId(playlist.id)}
                >
                  <PlaylistImage
                    src={playlist.images[0]?.url || '/fallback.jpg'}
                    alt={playlist.name}
                    boxSize="40px"
                  />
                  <PlaylistName>{playlist.name}</PlaylistName>
                </PlaylistItem>
              ))}
            </PlaylistList>
          </ScrollableSection>
        </ScrollableContainer>
      </PlaylistListContainer>

      <SlidingPanel
        id="playlist-panel"
        animate={{
          transform: selectedPlaylistId ? 'translateX(0%)' : 'translateX(100%)',
        }}
      >
        {selectedPlaylistId && (
          <ScrollableContainer>
            <ScrollableSection>
              <PlaylistPanel
                playlistId={selectedPlaylistId}
                onClose={() => setSelectedPlaylistId(null)}
              />
            </ScrollableSection>
          </ScrollableContainer>
        )}
      </SlidingPanel>
    </LibraryContainer>
  );
};

export default LibraryPage;
