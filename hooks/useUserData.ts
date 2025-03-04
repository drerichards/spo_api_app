// hooks/useUserData.ts
import { useEffect } from 'react';
import axios from 'axios';
import useAppStore from '@/store/appState';

export const useUserData = () => {
  const { userData, setUserData, isLoggingOut } = useAppStore();

  useEffect(() => {
    if (!userData && !isLoggingOut) {
      // Skip fetch during logout
      const fetchData = async () => {
        try {
          const tokenRes = await axios.get('/api/auth/get-token', {
            withCredentials: true,
          }); // Fix endpoint
          const userRes = await axios.get('https://api.spotify.com/v1/me', {
            headers: { Authorization: `Bearer ${tokenRes.data.accessToken}` },
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
  }, [userData, setUserData, isLoggingOut]);

  return { userData };
};
