import { Box, IconButton, Text, VStack, Image, chakra } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export const PlaylistListContainer = chakra(VStack, {
  baseStyle: {
    width: '100%',
    alignItems: 'stretch',
    padding: '16px',
  },
});

export const PlaylistItem = chakra(motion(Box), {
  baseStyle: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '12px',
    borderRadius: 'md',
    bg: 'background.panel',
    cursor: 'pointer',
    transition: 'background 0.5s ease, transform 0.5s ease',
    _hover: {
      bg: 'brand.200',
      transform: 'scale(1.02)',
    },
  },
});

export const PlaylistImage = chakra(Image, {
  baseStyle: {
    borderRadius: 'md',
  },
});

export const PlaylistName = chakra(Text, {
  baseStyle: {
    fontSize: 'md',
    fontWeight: 'medium',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

export const PanelContainer = chakra(Box, {
  baseStyle: {
    width: '100%',
    bg: 'background.panel',
    padding: '20px',
    boxShadow: '-4px 0px 10px rgba(0, 0, 0, 0.2)',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
});

export const PanelHeader = chakra(Box, {
  baseStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
});

export const PanelTitle = chakra(Text, {
  baseStyle: {
    fontSize: 'xl',
    fontWeight: 'bold',
    color: 'brand.400',
  },
});

export const CloseButton = chakra(IconButton, {
  baseStyle: {
    bg: 'transparent',
    color: 'brand.400',
    _hover: {
      bg: 'brand.500',
    },
  },
});

export const TrackList = chakra(Box, {
  baseStyle: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
});

export const TrackItem = chakra(Text, {
  baseStyle: {
    padding: '8px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    fontSize: 'md',
    cursor: 'pointer',
    _hover: {
      bg: 'brand.500',
    },
  },
});
