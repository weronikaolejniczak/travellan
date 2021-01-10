import axios from 'axios';
import { BACKEND_API_KEY, BACKEND_URL } from 'react-native-dotenv';

async function fetchCityCode(destination) {
  return await axios
    .get(`${BACKEND_URL}/location/cityCode?keyword=${destination}`)
    .then((json) => json.data)
    .catch((error) => {
      throw error;
    });
}

export default fetchCityCode;
