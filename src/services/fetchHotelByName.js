import axios from 'axios';
import { BACKEND_API_KEY, BACKEND_URL } from 'react-native-dotenv';

async function fetchHotelByName(hotel) {
  return await axios
    .get(`${BACKEND_URL}`)
    .then((json) => json.data)
    .catch((error) => {
      throw error;
    });
}

export default fetchHotelByName;
