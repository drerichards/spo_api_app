import { chakra } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  ToolkitLink,
  ToolkitPanelButton,
} from '@/components/_uiToolkit/styles/css-uiToolkit';

export const MenuLeftContainer = chakra(motion.div, {
  baseStyle: {
    height: '92vh',
    width: '200px',
    background: 'slate.900',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '16px',
    overflow: 'hidden',
    position: 'relative',
    marginLeft: '20px',
    justifyContent: 'space-between',
  },
});

export const MenuLeftTransition = chakra(motion.div, {
  baseStyle: {
    width: '100%',
    transition: 'opacity 0.35s ease, visibility 0.35s ease',
  },
});

export const MenuLeftToggleButton = chakra(ToolkitPanelButton, {
  baseStyle: {
    left: '5px',
    top: '65px',
  },
});

export const MenuLink = chakra(ToolkitLink, {
  baseStyle: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    width: '100%',
    _last: {
      borderBottom: 'none',
    },
  },
});

export const VStackContainer = chakra(motion.div, {
  baseStyle: {
    width: '100%',
  },
});
