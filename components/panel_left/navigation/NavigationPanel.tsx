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
// import { ToolkitSpinner } from '@/components/_uiToolkit/ui';

interface NavigationPanelProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const NavigationPanel = ({ isCollapsed, setIsCollapsed }: NavigationPanelProps) => {
  const { userData: user } = useUserData();
  const logout = useLogout();

  const handleLogout = async () => {
    await logout(); // Execute the logout function
  };


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
            animate={{
              x: isCollapsed ? '-100%' : '0%',
              opacity: isCollapsed ? 0 : 1,
              transition: { duration: 0.3, ease: 'easeInOut' },
            }}
            initial={{ x: '0%', opacity: 1 }}
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
