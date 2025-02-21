import { useState } from 'react';
import {
  SimpleGrid,
  Box,
  Image,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { SpotifyPlaylistData, SpotifyPlaylist } from '@/types/store';
import PlaylistPanel from './PlaylistPanel';
import { NullableString } from '@/types';

interface PlaylistGridProps {
  playlists: SpotifyPlaylistData;
}

const MotionBox = motion(Box);

const PlaylistGrid = ({ playlists }: PlaylistGridProps) => {
  const [selectedPlaylistId, setSelectedPlaylistId] =
    useState<NullableString>(null);
  const cardBg = useColorModeValue('gray.800', 'gray.700');

  return (
    <VStack
      spacing={6}
      w="full"
      p={8}
    >
      <Text
        fontSize="2xl"
        fontWeight="bold"
        color="brand.100"
      >
        Your Playlists
      </Text>

      <SimpleGrid
        columns={{ base: 2, sm: 3, md: 4, lg: 5 }}
        spacing={6}
        w="full"
      >
        {playlists.items.map((playlist: SpotifyPlaylist) => (
          <MotionBox
            key={playlist.id}
            whileHover={{ scale: 1.05 }}
            cursor="pointer"
            bg={cardBg}
            borderRadius="lg"
            p={4}
            boxShadow="lg"
            onClick={() => setSelectedPlaylistId(playlist.id)}
          >
            <Image
              src={playlist.images[0]?.url || '/fallback-image.png'}
              alt={playlist.name}
              borderRadius="md"
              boxSize="100%"
              objectFit="cover"
            />
            <Text
              fontSize="lg"
              mt={3}
              fontWeight="bold"
            >
              {playlist.name}
            </Text>
          </MotionBox>
        ))}
      </SimpleGrid>

      <PlaylistPanel
        playlistId={selectedPlaylistId}
        onClose={() => setSelectedPlaylistId(null)}
      />
    </VStack>
  );
};

export default PlaylistGrid;
