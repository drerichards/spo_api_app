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
        router.push('/');
      }
    };
    checkAuth();
  }, [hasAccessToken, userData, router]);

  if (!isAuthenticated) return <ToolkitSpinner />;

  return (
    <LayoutContainer id='layout'>
      <Header />
      <PageContainer>
        {isAuthenticated && (
          <NavigationPanel
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
        )}
        <MainContentContainer
          id="main-content"
          animate={{
            width: isCollapsed ? 'calc(100% - 40px)' : 'calc(100% - 252px)', // Stretch left from right edge
            transition: {
              duration: 0.35,
              ease: 'easeInOut',
              type: 'tween',
            },
          }}
          initial={false}
          css={{
            flex: '1 1 auto',
            position: 'absolute',
            right: 0, // Pin right edge to screen
            minWidth: 'calc(100% - 252px)', // Ensure it starts with enough space
          }}
        >
          {isAuthenticated ? children : <LoginPage />}
        </MainContentContainer>
      </PageContainer>
    </LayoutContainer>
  );
};

export default LayoutComponent;