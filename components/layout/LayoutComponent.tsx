// components/layout/LayoutComponent.tsx
import { useEffect, useState } from 'react';
import NavigationPanel from '@/components/panel_left/navigation/NavigationPanel';
import { LayoutContainer, PageContainer, MainContentContainer } from './styles/css-layout';
import Header from '../panel_top/Header';
import useAppStore from '@/store/appState';
import LoginPage from '../_pages/login/LoginPage';
import { useRouter } from 'next/router';
import { ToolkitSpinner } from '../_uiToolkit/ui';

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutComponent = ({ children }: LayoutProps) => {
  const router = useRouter();
  const { hasAccessToken, userData } = useAppStore();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await hasAccessToken();
      setIsAuthenticated(authenticated);
      if (!authenticated && router.pathname !== '/') {
        router.push('/'); // Force redirect to / if not authenticated
      }
    };
    checkAuth();
  }, [hasAccessToken, userData, router]);

  if (isAuthenticated === null) return <ToolkitSpinner />;

  return (
    <LayoutContainer>
      <Header />
      <PageContainer>
        {isAuthenticated && (
          <NavigationPanel
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
        )}
        <MainContentContainer
          animate={{
            flex: isCollapsed ? 1 : 1.2,
            transition: { duration: 0.3, ease: 'easeInOut' },
          }}
        >
          {isAuthenticated ? children : <LoginPage />}
        </MainContentContainer>
      </PageContainer>
    </LayoutContainer>
  );
};

export default LayoutComponent;