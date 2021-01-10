import axios from 'axios';
import { BACKEND_URL } from 'react-native-dotenv';

async function fetchHotelByName(cityCode, hotel) {
  return await axios
    .get(
      `${BACKEND_URL}/accommodation/hotelByName?cityCode=${cityCode}&radius=20&hotelName=${hotel}`,
    )
    .then((json) => json.data)
    .catch((error) => {
      throw error;
    });
}

export default fetchHotelByName;
