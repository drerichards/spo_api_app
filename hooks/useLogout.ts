// hooks/useLogout.ts
import { useRouter } from 'next/router';
import axios, { AxiosError } from 'axios';
import useAppStore from '@/store/appState';

const useLogout = () => {
    const router = useRouter();
    const setUserData = useAppStore(state => state.setUserData);

    const logout = async () => {
        try {
            useAppStore.setState({ isLoggingOut: true });
            const response = await axios.post('/api/auth/logout', {}, { withCredentials: true });
            console.log('Logout response:', response.data);
            setUserData(null);
            document.cookie = 'spotify_access_token=; Max-Age=0; path=/';
            router.push('/');
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error('Logout error:', axiosError.response?.data || axiosError.message);
            setUserData(null);
            document.cookie = 'spotify_access_token=; Max-Age=0; path=/';
            router.push('/');
        } finally {
            setTimeout(() => useAppStore.setState({ isLoggingOut: false }), 100);
        }
    };

    return logout;
};

export default useLogout;