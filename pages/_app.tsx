import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import Layout from '@/components/Layout';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  colors: {
    brand: {
      100: '#1D3557', // Deep slate-blue
      200: '#457B9D', // Brighter slate-blue
      300: '#A8DADC', // Neon cyan-blue
      400: '#F1FAEE', // Soft white for contrast
      500: '#E63946', // Accent red (for warnings/buttons)
    },
    background: {
      default: '#0A0E1A', // Dark slate background
      panel: '#121A26', // Slightly lighter panel background
    },
  },
  styles: {
    global: {
      body: {
        bg: 'background.default',
        color: 'brand.400',
      },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
