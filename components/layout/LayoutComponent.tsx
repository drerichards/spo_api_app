// components/layout/LayoutComponent.tsx
import { useState } from 'react';
import NavigationPanel from '@/components/panel_left/navigation/NavigationPanel';
import { LayoutContainer, PageContainer, MainContentContainer, AuthContentContainer } from './styles/css-layout';
import Header from '../panel_top/Header';
import LoginPage from '../_pages/login/LoginPage';
import { ToolkitSpinner } from '../_uiToolkit/ui';
import { useCheckAuth } from '@/hooks/useCheckAuth';

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutComponent = ({ children }: LayoutProps) => {
  const { isAuthenticated } = useCheckAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (isAuthenticated === null) return <ToolkitSpinner />;

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
        {!isAuthenticated ?
          <AuthContentContainer id='auth-content'>
            <LoginPage />
          </AuthContentContainer> :
          <MainContentContainer
            id="main-content"
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
        }
      </PageContainer>
    </LayoutContainer>
  );
};

export default LayoutComponent;