import { FaSpotify } from 'react-icons/fa';
import { useRouter } from 'next/router';
import {
  Heading,
  PageContainer,
  ContentContainer,
  Subheading,
  PermissionsBox,
  LoginButton,
} from './styles/css-login';
import { Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { NullableString } from '@/types';

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState<NullableString>(null);

  useEffect(() => {
    if (router.query.error) {
      setError('Authentication failed. Please try again.');
    }
  }, [router.query]);

  const handleLogin = () => {
    router.push('/api/auth/login');
  };

  return (
    <PageContainer>
      <ContentContainer>
        <Heading>Welcome to Spotio</Heading>
        <Subheading>Your personal Spotify-powered music experience</Subheading>

        <PermissionsBox>
          <Text fontWeight="bold">By logging in with Spotify, you grant:</Text>
          <ul>
            <li>🔹 Access to your public profile (name, avatar, email).</li>
            <li>🔹 Read your playlists and liked songs.</li>
            <li>🔹 Control playback on your Spotify devices.</li>
            <li>🔹 View your top artists and listening history.</li>
          </ul>
          <Text
            fontSize="sm"
            mt={3}
          >
            We <strong>**do not**</strong> store your password. Authentication
            is handled via Spotify OAuth.
          </Text>
        </PermissionsBox>

        <LoginButton
          leftIcon={<FaSpotify />}
          onClick={handleLogin}
        >
          Log in with Spotify
        </LoginButton>
        {error && <p style={{ color: 'red' }}>{`Error: {${error}`}</p>}
      </ContentContainer>
    </PageContainer>
  );
};

export default LoginPage;
