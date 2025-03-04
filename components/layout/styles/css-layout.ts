import { chakra } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export const LayoutContainer = chakra('div', {
  baseStyle: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    background: 'background.default',
  },
});

export const MainContentContainer = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    ['animate', 'transition', 'initial', 'exit', 'children'].includes(prop) ||
    prop.startsWith('data-'),
});

export const PageContainer = chakra('div', {
  baseStyle: {
    display: 'flex',
    flex: 1,
  },
});

export const ScrollableContainer = chakra('div', {
  baseStyle: {
    display: 'flex',
    overflow: 'hidden',
  },
});

export const ScrollableSection = chakra('div', {
  baseStyle: {
    flex: 1,
    overflowY: 'auto',
    maxHeight: '89vh',
  },
});