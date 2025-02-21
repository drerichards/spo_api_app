import { VStack, Text, Icon } from '@chakra-ui/react';
import { FaHome, FaMusic, FaCog } from 'react-icons/fa';
import { useFetchUserPlaylists } from '@/hooks/useFetchUserPlaylists';
import UserDetails from './user/UserDetails';
import * as css from './styled';

const Sidebar = () => {
  const { data: playlists, isLoading } = useFetchUserPlaylists();

  return (
    <css.SidebarContainer as="aside">
      <UserDetails />

      {/* Main Navigation */}
      <VStack
        align="start"
        spacing={4}
      >
        <css.NavLink href="/">
          <Icon
            as={FaHome}
            mr={2}
          />{' '}
          <Text>Home</Text>
        </css.NavLink>
        <css.NavLink href="/user/dashboard">
          <Icon
            as={FaMusic}
            mr={2}
          />{' '}
          <Text>Library</Text>
        </css.NavLink>
        <css.NavLink href="/settings">
          <Icon
            as={FaCog}
            mr={2}
          />{' '}
          <Text>Settings</Text>
        </css.NavLink>
      </VStack>

      {/* Playlists Section */}
      <VStack
        align="start"
        spacing={3}
        mt={8}
        overflowY="auto"
        maxH="80vh"
      >
        <Text
          fontWeight="bold"
          fontSize="lg"
          mb={2}
        >
          Playlists
        </Text>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          playlists?.map(playlist => (
            <css.PlaylistItem
              key={playlist.id}
              href={`#`}
            >
              <Text>{playlist.name}</Text>
            </css.PlaylistItem>
          ))
        )}
      </VStack>
    </css.SidebarContainer>
  );
};

export default Sidebar;
