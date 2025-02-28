import { VStack, Avatar, Text } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import {
  MenuLink,
  MenuLeftContainer,
  MenuLeftToggleButton,
} from './styles';
import { useUserData } from '@/hooks/useUserData';

interface MenuLeftSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const MenuLeftSidebar = ({ isCollapsed, setIsCollapsed }: MenuLeftSidebarProps) => {
  const { data: user } = useUserData();

  return (
    <>
      {/* Sidebar Toggle Button */}
      <MenuLeftToggleButton
        icon={isCollapsed ? <HamburgerIcon boxSize={4} /> : <CloseIcon boxSize={3} />}
        aria-label="Toggle Sidebar"
        onClick={() => setIsCollapsed(!isCollapsed)}
        size="sm"
      />

      {/* Sidebar Container with Slide & Fade Animation */}
      <MenuLeftContainer
        animate={{
          x: isCollapsed ? '-100%' : '0%',
          opacity: isCollapsed ? 0 : 1,
        }}
        initial={{ x: '0%', opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {/* User Info */}
        {user && (
          <VStack align="start" spacing={3} w="full">
            <Avatar name={user.display_name} src={user.images[0]?.url} size="md" />
            <Text fontSize="md" fontWeight="bold">{user.display_name}</Text>
          </VStack>
        )}

        {/* Navigation Links */}
        <VStack align="start" gap={0} w="full">
          <MenuLink href="/">Home</MenuLink>
          <MenuLink href="/user/library">Your Library</MenuLink>
          <MenuLink href="/user/settings">Settings</MenuLink>
        </VStack>
      </MenuLeftContainer>
    </>
  );
};

export default MenuLeftSidebar;