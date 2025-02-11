import Image from 'next/image';
import { useUserData } from '@/hooks/useUserData';
import useAppStore from '@/store/appState';
import { useFetchUserPlaylists } from '@/hooks/useFetchUserPlaylists';
import PlaylistGrid from '@/components/playlist/PlaylistGrid';

const Dashboard = () => {
  const { data, isLoading: userLoading, error: userError } = useUserData();

  const {
    data: userPlaylists,
    isLoading: playlistsLoading,
    error: playlistsError,
  } = useFetchUserPlaylists();

  const storeData = useAppStore(state => state.userData);
  const userData = storeData ? storeData : data;

  if (userLoading || playlistsLoading) return <p>Loading...</p>;
  if (userError || playlistsError)
    return <p>Error: {userError?.message || playlistsError?.message}</p>;

  // console.log(userPlaylists);
  // console.log(userData);

  return (
    <div>
      <h1>Dashboard</h1>
      {userData && (
        <div>
          <p>Name: {userData.display_name}</p>
          <p>Email: {userData.email}</p>
          <Image
            src={userData.images[0].url}
            alt="Profile"
            width={50}
            height={50}
            style={{ borderRadius: '50%' }}
          />
          {userPlaylists ? (
            <PlaylistGrid playlists={userPlaylists} />
          ) : (
            <p>No playlists available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
