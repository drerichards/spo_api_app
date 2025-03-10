import { chakra, Box, VStack, Button, Text } from '@chakra-ui/react';

export const PageContainer = chakra(Box, {
  baseStyle: {
    display: 'flex',
    height: '92vh',
    justifyContent: 'center',
    alignItems: 'center',
    bg: 'background.default',
  },
});

export const ContentContainer = chakra(VStack, {
  baseStyle: {
    bg: 'background.panel',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 5px 15px',
    textAlign: 'center',
    maxWidth: '400px',
    width: '90%',
  },
});

export const Heading = chakra(Text, {
  baseStyle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'brand.400',
  },
});

export const Subheading = chakra(Text, {
  baseStyle: {
    fontSize: '16px',
    color: 'brand.300',
    marginBottom: '20px',
  },
});

export const PermissionsBox = chakra(Box, {
  baseStyle: {
    bg: 'brand.100',
    padding: '15px',
    borderRadius: '8px',
    fontSize: '14px',
    color: 'brand.400',
    textAlign: 'left',
    width: '100%',
    ul: {
      listStyle: 'none',
      padding: 0,
      marginTop: '8px',
    },
    li: {
      marginBottom: '5px',
    },
  },
});

export const LoginButton = chakra(Button, {
  baseStyle: {
    bg: 'brand.500',
    color: 'white',
    fontWeight: 'bold',
    width: '100%',
    marginTop: '20px',
    borderRadius: '8px',
    transition: '0.35s',
    _hover: {
      bg: 'brand.300',
    },
  },
});
