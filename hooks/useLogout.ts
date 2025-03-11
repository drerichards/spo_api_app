// hooks/useLogout.ts
import { useRouter } from 'next/router';
import axios, { AxiosError } from 'axios';
import useAppStore from '@/store/appState';
import { parse } from 'cookie';
import { useState } from 'react';
import { useCheckAuth } from '@/hooks/useCheckAuth';

const useLogout = () => {
    const router = useRouter();
    const setUserData = useAppStore(state => state.setUserData);
    const { setIsAuthenticated } = useCheckAuth();
    const [loading, setLoading] = useState(false);

    const logout = async () => {
        setLoading(true);
        try {
            useAppStore.setState({ isLoggingOut: true });

            const cookies = parse(document.cookie);
            const csrfToken = cookies.csrf_token || (await axios.get('/api/auth/get-csrf-token', { withCredentials: true })).data.csrfToken;

            if (!csrfToken) {
                throw new Error('CSRF token not found');
            }

            setUserData(null);
            router.push('/');
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error('Logout error:', {
                message: axiosError.message,
                status: axiosError.response?.status,
                data: axiosError.response?.data,
            });
            setUserData(null);
            setIsAuthenticated(false);
            router.push({
                pathname: '/error',
                query: { message: axiosError.message, status: axiosError.response?.status, data: JSON.stringify(axiosError.response?.data) },
            });
        } finally {
            useAppStore.setState({ isLoggingOut: false });
            setLoading(false);
        }
    };

    return { logout, loading };
};

export default useLogout;