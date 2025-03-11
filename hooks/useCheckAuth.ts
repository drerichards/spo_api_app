// hooks/useCheckAuth.ts
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import authService from '@/services/authService';
import useAppStore from '@/store/appState';

export const useCheckAuth = () => {
    const router = useRouter();
    const isLoggingOut = useAppStore(state => state.isLoggingOut);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        let isMounted = true;

        const checkAuth = async () => {
            try {
                const authenticated = await authService.checkAuth();
                if (isMounted) {
                    setIsAuthenticated(authenticated);
                    if (!authenticated && !['/', '/login', '/error'].includes(router.pathname)) {
                        router.push('/login');
                    }
                }
            } catch (error) {
                console.error('Error during auth check:', error);
                if (isMounted) {
                    setIsAuthenticated(false);
                    if (!['/', '/login', '/error'].includes(router.pathname)) {
                        router.push('/login');
                    }
                }
            }
        };

        checkAuth();

        return () => { isMounted = false; };
    }, [router, isLoggingOut]);

    return { isAuthenticated, setIsAuthenticated };
};