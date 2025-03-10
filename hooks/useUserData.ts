// hooks/useUserData.ts
import { useEffect } from 'react';
import axios from 'axios';
import spotifyAxios from '@/utils/spotifyAxios';
import useAppStore from '@/store/appState';
import { useCheckAuth } from '@/hooks/useCheckAuth';

export const useUserData = () => {
  const { isAuthenticated } = useCheckAuth();
  const { userData, setUserData, isLoggingOut } = useAppStore();

  useEffect(() => {
    if (!userData && !isLoggingOut && isAuthenticated) {
      const fetchData = async () => {
        try {
          const tokenRes = await axios.get('/api/auth/get-token', {
            withCredentials: true,
          });

          const accessToken = tokenRes.data.accessToken;
          if (!accessToken) throw new Error('No access token');

          const userRes = await spotifyAxios.get('/me', {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          setUserData({
            display_name: userRes.data.display_name,
            id: userRes.data.id,
            email: userRes.data.email,
            country: userRes.data.country,
            images: userRes.data.images || [],
          });
        } catch (error) {
          console.error('Fetch user data failed:', error);
        }
      };
      fetchData();
    }
  }, [userData, setUserData, isLoggingOut, isAuthenticated]);

  return { userData };
};
