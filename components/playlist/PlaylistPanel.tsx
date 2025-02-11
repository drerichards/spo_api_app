import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    VStack,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import { useFetchPlaylistTracks } from '@/hooks/useFetchPlaylistTracks';
import { NullableString } from '@/types';

interface PlaylistPanelProps {
    playlistId: NullableString;
    onClose: () => void;
}

const PlaylistPanel = ({ playlistId, onClose }: PlaylistPanelProps) => {
    const { data: tracks, isLoading } = useFetchPlaylistTracks(playlistId as NullableString);
    const panelBg = useColorModeValue('gray.900', 'gray.800');

    return (
        <Drawer isOpen={!!playlistId} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent bg={panelBg} color="brand.100">
                <DrawerCloseButton />
                <DrawerHeader borderBottom="2px solid" borderColor="brand.300">Playlist Tracks</DrawerHeader>
                <DrawerBody>
                    {isLoading ? (
                        <Text>Loading...</Text>
                    ) : (
                        <VStack spacing={4} align="start">
                            {tracks?.map(track => (
                                <Text key={track.id}>
                                    {track.name} - {track.artists.map(artist => artist.name).join(', ')}
                                </Text>
                            ))}
                        </VStack>
                    )}
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default PlaylistPanel;