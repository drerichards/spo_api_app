import styled from 'styled-components';
import { Box, Link, Text } from '@chakra-ui/react';

export const SidebarContainer = styled(Box)`
  width: 250px; /* Ensure fixed width */
  height: 100vh;
  background: var(--chakra-colors-slate-800);
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow-x: hidden; /* Prevent expansion */
  white-space: nowrap; /* Prevent text wrapping */
`;

export const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-bottom: 5px;
`;

export const PlaylistItem = styled(Text)`
  display: block;
  max-width: 100%; /* Prevents text from affecting layout */
  overflow: hidden; /* Hide overflowing text */
  text-overflow: ellipsis; /* Show "..." for overflowed text */
  white-space: nowrap; /* Keep text in a single line */
  color: white;
`;
