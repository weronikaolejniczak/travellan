import axios from 'axios';
import { BACKEND_URL } from 'react-native-config';

async function fetchCoordinates(keyword) {
  return await axios
    .get(`${BACKEND_URL}/location/coordinates?keyword=${keyword}`)
    .then((json) => json.data)
    .catch((error) => {
      throw error;
    });
}

export default fetchCoordinates;
