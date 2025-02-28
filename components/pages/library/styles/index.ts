import { ToolkitListItem } from '@/components/_uiToolkit';
import { List, Image, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const LibraryContainer = styled(motion.div)`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  transition: width 0.3s ease-in-out;
  overflow-x: hidden;

`;

export const PlaylistListContainer = styled(motion.div)`
  flex: 1;
  padding: 24px 24px 0;
  overflow-y: auto;
  color: ${({ theme }) => theme.colors.brand[400]};
  transform: translateX(0%);
  transition: transform 0.3s ease-in-out;
  background: ${({ theme }) => theme.colors.background.panel};
  height: 92vh;
  overflow: hidden;
`;

export const SlidingPanel = styled(motion.div)`
  width: 25%;
  min-width: 350px;
  height: 92vh;
  background: ${({ theme }) => theme.colors.background.panel};
  box-shadow: -2px 0px 10px rgba(0, 0, 0, 0.2);
  position: absolute;
  right: 0;
  z-index: 0;
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
`;

export const PlaylistList = styled(List)`
  width: 100%;
  padding: 4px;
  margin-top: 8px;
`;

export const PlaylistItem = styled(ToolkitListItem)`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px;
  transition: background 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.brand[500]};
  }
`;

export const PlaylistImage = styled(Image)`
  border-radius: var(--chakra-radii-md);
  width: 40px;
  height: 40px;
`;

export const PlaylistName = styled(Text)`
  font-size: var(--chakra-fontSizes.md);
  font-weight: medium;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
