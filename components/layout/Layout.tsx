import { ReactNode } from 'react';
import { Flex, Box } from '@chakra-ui/react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Flex
      h="100vh"
      bg="slate.900"
      color="white"
    >
      <Box
        flex="1"
        p={6}
        overflowY="auto"
      >
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;
