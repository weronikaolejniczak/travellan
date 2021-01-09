import axios from 'axios';
import { BACKEND_API_KEY, BACKEND_URL } from 'react-native-dotenv';

async function fetchDestinationImage(keyword) {
  return await axios
    .get(`${BACKEND_URL}/images/unsplash?keyword=${keyword}`)
    .then((json) => json.data)
    .catch((error) => {
      throw error;
    });
}

export default fetchDestinationImage;
