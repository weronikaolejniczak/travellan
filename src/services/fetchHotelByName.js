import axios from 'axios';
import { BACKEND_URL } from 'react-native-dotenv';

async function fetchHotelByName(latitude, longitude, hotel) {
  return await axios
    .get(
      `${BACKEND_URL}/accommodation/hotelByName?latitude=${latitude}&longitude=${longitude}&radius=30&hotelName=${hotel}`,
    )
    .then((json) => json.data)
    .catch((error) => {
      throw error;
    });
}

export default fetchHotelByName;
