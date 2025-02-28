import { ListItem } from '@chakra-ui/react';
import Link from 'next/link';
import { IconButton } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const ToolkitLink = styled(Link)`
  color: var(--chakra-colors-brand-400);
  transition: background 0.3s ease;
  width: 100%;
  padding: 5px;
  border-radius: 2px;

  &:hover {
    background-color: var(--chakra-colors-brand-500);
    padding-left: 8px;
  }
`;

export const ToolkitListItem = styled(ListItem)`
  transition: background 0.3s ease;
  width: 100%;
  padding: 5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  font-weight: 300;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: var(--chakra-colors-brand-500);
    padding-left: 8px;
    font-weight: 700;
  }
`;

export const ToolkitPanelButton = styled(IconButton)`
  position: absolute;
  background: transparent;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  padding: 5px 10px;
  min-width: unset;

  z-index: 1000;
  color: white;
  transition: background 0.3s ease;

  &:hover {
    background: transparent;
    opacity: 0.35;
  }
`;

export const ToolkitSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
