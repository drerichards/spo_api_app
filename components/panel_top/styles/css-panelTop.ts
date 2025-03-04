import { chakra } from '@chakra-ui/react';

export const HeaderContainer = chakra('div', {
  baseStyle: {
    bg: '#1d3557 !important',
    color: 'white !important',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
});