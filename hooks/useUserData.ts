import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUserData = async () => {
  const { data } = await axios.get('/api/user', { withCredentials: true });
  return data;
};

export const useUserData = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUserData,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
