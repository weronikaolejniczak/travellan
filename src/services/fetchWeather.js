import axios from 'axios';
import { BACKEND_API_KEY, BACKEND_URL } from 'react-native-dotenv';

async function fetchWeather(latitude, longitude) {
  return await axios
    .get(`${BACKEND_URL}/weather?latitude=${latitude}&longitude=${longitude}`)
    .then((json) => json.data)
    .catch((error) => {
      throw error;
    });
}

export default fetchWeather;
