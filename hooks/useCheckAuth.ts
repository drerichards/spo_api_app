import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useAppStore from '@/store/appState';

export const useCheckAuth = () => {
    const router = useRouter();
    const { hasAccessToken, userData } = useAppStore();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        let isMounted = true; // To prevent state updates on unmounted component

        const checkAuth = async () => {
            try {
                const authenticated = await hasAccessToken();
                if (isMounted) {
                    setIsAuthenticated(authenticated);
                    if (!authenticated && router.pathname !== '/' && !router.pathname.startsWith('/api/')) {
                        router.push('/');
                    }
                }
            } catch (error) {
                console.error('Error during auth check:', error);
                if (isMounted) {
                    setIsAuthenticated(false);
                    if (router.pathname !== '/' && !router.pathname.startsWith('/api/')) {
                        router.push('/');
                    }
                }
            }
        };

        checkAuth();

        return () => {
            isMounted = false; // Cleanup on unmount
        };
    }, [hasAccessToken, userData, router]);

    return { isAuthenticated };
}