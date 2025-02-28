import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Box } from '@chakra-ui/react';

export const LayoutContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background: var(--chakra-colors-slate-900);
`;

export const MainContentContainer = styled(motion.div) <{
  isCollapsed: boolean;
}>`
  flex: ${({ isCollapsed }) => (isCollapsed ? '1' : '1.2')};
  /* padding: 16px; */
  overflow-y: auto;
  transition:
  flex 0.3s ease,
  margin-left 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: ${({ isCollapsed }) => (isCollapsed ? '-195px' : '00px')};

`;

export const PageContainer = styled(Box)`
  display: flex;
  flex: 1;
`;

export const ScrollableContainer = styled.div`
  display: flex;
  /* height: 100vh; */
  overflow-x: hidden;
  overflow: hidden;
`;

export const ScrollableSection = styled.div`
  flex: 1;
  overflow-y: auto;
  max-height: 100vh;
`;