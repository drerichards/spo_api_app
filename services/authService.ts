// services/authService.ts
import axios, { AxiosError } from 'axios';

const authService = {
    checkAuth: async () => {
        try {
            const response = await axios.get('/api/auth/authenticated', {
                withCredentials: true,
                headers: { 'Cache-Control': 'no-store' },
            });
            return response.data.authenticated;
        } catch (error) {
            const err = error as AxiosError;
            console.error('Auth check error:', {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status,
            });
            return false;
        }
    },
    refreshToken: async () => {
        try {
            const response = await axios.post(
                '/api/auth/refresh',
                null,
                { withCredentials: true }
            );
            return response.data.access_token;
        } catch (error) {
            console.error('Refresh error:', error);
            return null;
        }
    },
};

export default authService;