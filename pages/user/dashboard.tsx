import { useUserData } from '@/hooks/useUserData';
import { useFetchUserPlaylists } from '@/hooks/useFetchUserPlaylists';
import PlaylistGrid from '@/components/playlist/PlaylistGrid';

const Dashboard = () => {
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useUserData();
  const {
    data: userPlaylists,
    isLoading: playlistsLoading,
    error: playlistsError,
  } = useFetchUserPlaylists();

  if (userLoading || playlistsLoading) return <p>Loading...</p>;
  if (userError || playlistsError)
    return <p>Error: {userError?.message || playlistsError?.message}</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      {userData && <p>Welcome, {userData.display_name}</p>}
      {userPlaylists ? (
        <PlaylistGrid playlists={userPlaylists} />
      ) : (
        <p>No playlists available</p>
      )}
    </div>
  );
};

export default Dashboard;
