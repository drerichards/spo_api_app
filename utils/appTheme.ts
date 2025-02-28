import { extendTheme, theme as baseTheme } from '@chakra-ui/react';
import { Mulish } from 'next/font/google';

const mulish = Mulish({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const themeOverrides = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    heading: mulish.style.fontFamily,
    body: mulish.style.fontFamily,
  },
  colors: {
    ...baseTheme.colors,
    brand: {
      100: '#1D3557',
      200: '#457B9D',
      300: '#A8DADC',
      400: '#F1FAEE',
      500: '#099139',
    },
    background: {
      panel: '#0A0E1A',
      default: '#121820',
    },
  },
  styles: {
    global: {
      'html, body': {
        fontSize: 'md',
        color: 'brand.400',
        bg: 'background.default',
      },
    },
  },
});

export default themeOverrides;
