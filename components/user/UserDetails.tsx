import { useUserData } from '@/hooks/useUserData';
import useAppStore from '@/store/appState';
import * as css from './styles';

const UserDetails = () => {
  const storeData = useAppStore(state => state.userData);
  const {
    data: fetchedData,
    isLoading: userLoading,
    error: userError,
  } = useUserData();
  const userData = storeData || fetchedData;

  if (userLoading) return <p>Loading...</p>;
  if (userError) return <p>Error: {userError?.message}</p>;

  return (
    <>
      {userData && (
        <css.Container>
          <css.ProfileImage
            src={userData.images[0]?.url || '/fallback-image.png'}
            alt="Profile"
            width={40}
            height={40}
          />
          <p>{userData.display_name}</p>
        </css.Container>
      )}
    </>
  );
};

export default UserDetails;
