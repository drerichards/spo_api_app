// hooks/useTokenRefresh.ts
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import authService from '@/services/authService';

export const useTokenRefresh = (expiresIn: number) => {
    const router = useRouter();

    useEffect(() => {
        const refreshBuffer = 300 * 1000;
        const refreshInterval = (expiresIn * 1000) - refreshBuffer;

        const refreshToken = async () => {
            try {
                const newToken = await authService.refreshToken();
                if (!newToken && router.pathname !== '/') {
                    router.push('/api/auth/login');
                }
            } catch (error) {
                console.error('Token refresh failed:', error);
                if (router.pathname !== '/') {
                    router.push('/api/auth/login');
                }
            }
        };

        if (expiresIn > 0) {
            const timer = setInterval(refreshToken, refreshInterval);
            return () => clearInterval(timer);
        }
    }, [expiresIn, router]);
};