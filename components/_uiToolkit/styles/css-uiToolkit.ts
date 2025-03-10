import { ListItem } from '@chakra-ui/react';
import Link from 'next/link';
import { IconButton } from '@chakra-ui/react';
import { chakra } from '@chakra-ui/react';

export const ToolkitLink = chakra(Link, {
  baseStyle: {
    color: 'brand.400',
    transition: 'background 0.35s ease',
    width: '100%',
    padding: '5px',
    borderRadius: '2px',
    _hover: {
      backgroundColor: 'brand.500',
      paddingLeft: '8px',
    },
  },
});

export const ToolkitListItem = chakra(ListItem, {
  baseStyle: {
    transition: 'background 0.35s ease',
    width: '100%',
    padding: '5px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    cursor: 'pointer',
    fontWeight: '300',
    _last: {
      borderBottom: 'none',
    },
    _hover: {
      backgroundColor: 'brand.500',
      paddingLeft: '8px',
      fontWeight: '700',
    },
  },
});

export const ToolkitPanelButton = chakra(IconButton, {
  baseStyle: {
    position: 'absolute',
    background: 'transparent',
    borderRadius: '50%',
    width: '28px',
    height: '28px',
    padding: '5px 10px',
    minWidth: 'unset',
    zIndex: '1000',
    color: 'white',
    transition: 'background 0.35s ease',
    _hover: {
      opacity: 0.35,
    },
  },
});

export const ToolkitSpinnerContainer = chakra('div', {
  baseStyle: {
    display: 'flex',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});


export const ToolkitSpinnerPageContainer = chakra('div', {
  baseStyle: {
    width: '100vw',
    height: '100vh',
  }
});