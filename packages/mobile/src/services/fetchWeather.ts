import axios from 'axios';
import { BACKEND_URL } from 'react-native-config';

async function fetchWeather(latitude, longitude) {
  return await axios
    .get(`${BACKEND_URL}/weather?latitude=${latitude}&longitude=${longitude}`)
    .then((json) => json.data)
    .catch((error) => {
      throw error;
    });
}

export default fetchWeather;
