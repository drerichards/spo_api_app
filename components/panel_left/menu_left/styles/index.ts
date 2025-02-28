import { ToolkitLink, ToolkitPanelButton } from '@/components/_uiToolkit';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const MenuLeftContainer = styled(motion.div)`
  height: 100vh;
  width: 200px;
  background: var(--chakra-colors-slate-900);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  overflow: hidden;
  position: relative;
  margin-left: 20px;
`;

export const MenuLeftTransition = styled(motion.div)`
  width: 100%;
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
`;

export const MenuLeftToggleButton = styled(ToolkitPanelButton)`
  left: 5px;
  top: 65px;
`;

export const MenuLink = styled(ToolkitLink)`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;
