import { VStack, Avatar, Text, Divider } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import {
  MenuLink,
  MenuLeftContainer,
  MenuLeftToggleButton,
  VStackContainer
} from '../styles/css-panelLeft';
import { useUserData } from '@/hooks/useUserData';
import useLogout from '@/hooks/useLogout';

interface NavigationPanelProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const NavigationPanel = ({ isCollapsed, setIsCollapsed }: NavigationPanelProps) => {
  const { userData: user } = useUserData();
  const logout = useLogout();

  const handleLogout = async () => await logout();

  return (
    <>
      {user && (
        <>
          <MenuLeftToggleButton
            icon={isCollapsed ? <HamburgerIcon boxSize={4} /> : <CloseIcon boxSize={3} />}
            aria-label="Toggle Sidebar"
            onClick={() => setIsCollapsed(!isCollapsed)}
            size="sm" />
          <MenuLeftContainer
            id='navigation-panel'
            animate={{
              x: isCollapsed ? -200 : 0,
              transition: {
                duration: 0.35,
                ease: 'easeInOut',
                type: 'tween',
              },
            }}
            initial={false}
          >
            <VStackContainer>
              <VStack align="start" spacing={3} w="full">
                <Avatar name={user.display_name} src={user.images[0]?.url} size="md" />
                <Text fontSize="md" fontWeight="bold">{user.display_name}</Text>
              </VStack>

              <VStack align="start" gap={0} w="full">
                <MenuLink href="/">Home</MenuLink>
                <MenuLink href="/user/library">Your Library</MenuLink>
                <MenuLink href="/user/settings">Settings</MenuLink>
              </VStack>
            </VStackContainer>
            <VStackContainer>
              <Divider />
              <VStack align="start" gap={0} w="full">
                <MenuLink as={'button'} onClick={handleLogout}>Logout</MenuLink>
              </VStack>
            </VStackContainer>
          </MenuLeftContainer>
        </>
      )}
    </>
  );
};

export default NavigationPanel;
