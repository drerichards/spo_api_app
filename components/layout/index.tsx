import { useState } from 'react';
import MenuLeftSidebar from '@/components/panel_left/menu_left/MenuLeftSidebar';
import MusicPlayer from '@/components/panel_bottom/music_player/MusicPlayer';
import { LayoutContainer, PageContainer, MainContentContainer } from './styles';
import Header from '../panel_top/Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <LayoutContainer>
      <Header />
      <PageContainer>
        <MenuLeftSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />

        <MainContentContainer
          isCollapsed={isCollapsed}
          animate={{ flex: isCollapsed ? '1' : '1.2' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {children}
        </MainContentContainer>
      </PageContainer>

      <MusicPlayer />
    </LayoutContainer>
  );
};

export default Layout;
