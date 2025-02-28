import { Box, IconButton, Text, VStack, Image } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const PlaylistListContainer = styled(VStack)`
  width: 100%;
  align-items: stretch;
  padding: 16px;
`;

export const PlaylistItem = styled(motion(Box))`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  border-radius: var(--chakra-radii-md);
  background: ${({ theme }) => theme.colors.background.panel};
  cursor: pointer;
  transition:
    background 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.brand[200]};
    transform: scale(1.02);
  }
`;

export const PlaylistImage = styled(Image)`
  border-radius: var(--chakra-radii-md);
`;

export const PlaylistName = styled(Text)`
  font-size: var(--chakra-fontSizes-md);
  font-weight: medium;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PanelContainer = styled(Box)`
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  background: ${({ theme }) => theme.colors.background.panel};
  padding: 20px;
  box-shadow: -4px 0px 10px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const PanelHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const PanelTitle = styled(Text)`
  font-size: var(--chakra-fontSizes-xl);
  font-weight: bold;
  color: ${({ theme }) => theme.colors.brand[400]};
`;

export const CloseButton = styled(IconButton)`
  background: transparent;
  color: ${({ theme }) => theme.colors.brand[400]};
  &:hover {
    background: ${({ theme }) => theme.colors.brand[500]};
  }
`;

export const TrackList = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TrackItem = styled(Text)`
  padding: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: var(--chakra-fontSizes-md);
  color: ${({ theme }) => theme.colors.brand[300]};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.brand[200]};
    color: ${({ theme }) => theme.colors.brand[400]};
  }
`;
