import axios from 'axios';

const spotifyAxios = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default spotifyAxios;
