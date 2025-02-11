import axios from 'axios';

const spotifyAxios = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

spotifyAxios.interceptors.request.use(async config => {
  try {
    // Fetch the access token from the backend
    const tokenResponse = await axios.get('/api/auth/get-token', {
      withCredentials: true, // Send cookies with the request
    });

    const accessToken = tokenResponse.data.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  } catch (error) {
    console.error('Failed to get access token', error);
  }

  return config;
});

export default spotifyAxios;
