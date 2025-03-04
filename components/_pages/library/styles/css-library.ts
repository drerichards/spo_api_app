import { List, Image, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { chakra } from '@chakra-ui/react';
import { ToolkitListItem } from '@/components/_uiToolkit/styles/css-uiToolkit';

export const LibraryContainer = chakra(motion.div, {
  baseStyle: {
    display: 'flex',
    width: '100%',
    height: '100%',
    position: 'relative',
    transition: 'width 0.35s ease-in-out',
    overflowX: 'hidden',
  },
});

export const PlaylistListContainer = chakra(motion.div, {
  baseStyle: ({ theme }) => ({
    flex: 1,
    padding: '24px 24px 0',
    overflowY: 'auto',
    color: theme.colors.brand[400],
    transform: 'translateX(0%)',
    transition: 'transform 0.35s ease-in-out',
    background: theme.colors.background.panel,
    height: '92vh',
    overflow: 'hidden',
  }),
});

export const SlidingPanel = chakra(motion.div, {
  baseStyle: ({ theme }) => ({
    width: '25%',
    minWidth: '350px',
    height: '92vh',
    background: theme.colors.background.panel,
    boxShadow: '-2px 0px 10px rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    right: 0,
    zIndex: 0,
    transform: 'translateX(100%)',
    transition: 'transform 0.35s ease-in-out',
  }),
});

export const PlaylistList = chakra(List, {
  baseStyle: {
    width: '100%',
    padding: '4px',
    marginTop: '8px',
  },
});

export const PlaylistItem = chakra(ToolkitListItem, {
  baseStyle: ({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '10px',
    transition: 'background 0.35s ease',
    cursor: 'pointer',
    _hover: {
      backgroundColor: theme.colors.brand[500],
    },
  }),
});

export const PlaylistImage = chakra(Image, {
  baseStyle: {
    borderRadius: 'md',
    width: '40px',
    height: '40px',
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
