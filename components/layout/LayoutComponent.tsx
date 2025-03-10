import { useState } from 'react';
import NavigationPanel from '@/components/panel_left/navigation/NavigationPanel';
import { LayoutContainer, PageContainer, MainContentContainer } from './styles/css-layout';
import Header from '../panel_top/Header';
import { ToolkitSpinner } from '../_uiToolkit/ui';
import { useCheckAuth } from '@/hooks/useCheckAuth';
import useAppStore from '@/store/appState';
import { useTokenRefresh } from '@/hooks/useTokenRefresh';
import { useRouter } from 'next/router';
import useLogout from '@/hooks/useLogout';
import { ToolkitSpinnerPageContainer } from '../_uiToolkit/styles/css-uiToolkit';

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutComponent = ({ children }: LayoutProps) => {
  const { isAuthenticated } = useCheckAuth();
  const { tokenExpiresIn, isLoggingOut } = useAppStore();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const { logout, loading } = useLogout();

  useTokenRefresh(tokenExpiresIn);

  if (isAuthenticated === null || isLoggingOut) return <ToolkitSpinner />;

  const isPublicRoute = ['/', '/login', '/error'].includes(router.pathname);
  if (isPublicRoute || !isAuthenticated) {
    return children;
  }

  return (
    <>
      {!loading ?
        <LayoutContainer id='layout-container'>
          <Header />
          <PageContainer id='page-container'>
            <NavigationPanel
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
              handleLogout={logout}
              isLoading={loading}
            />
            <MainContentContainer
              id='main-content-container'
              animate={{
                width: isCollapsed ? 'calc(100% - 40px)' : 'calc(100% - 252px)',
                transition: {
                  duration: 0.35,
                  ease: 'easeInOut',
                  type: 'tween',
                },
              }}
              initial={false}
              css={{
                minWidth: 'calc(100% - 252px)',
              }}
            >
              {children}
            </MainContentContainer>
          </PageContainer>
        </LayoutContainer>
        :
        <ToolkitSpinnerPageContainer id='toolkit-spinner-page-container'>
          <ToolkitSpinner />
        </ToolkitSpinnerPageContainer>
      }
    </>
  );
};

export default LayoutComponent;