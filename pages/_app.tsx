// pages/_app.tsx
import '@/global-styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import Layout from '@/components/layout/LayoutComponent';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import appTheme from '@/utils/appTheme';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <ColorModeScript initialColorMode={appTheme.config.initialColorMode} />
      <ChakraProvider theme={appTheme}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ChakraProvider>
    </>
  );
}