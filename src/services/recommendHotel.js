import axios from 'axios';
import { BACKEND_URL } from 'react-native-dotenv';

async function recommendHotel(
  cityCode,
  checkInDate,
  checkOutDate,
  radius,
  roomQuantity,
) {
  return await axios
    .get(`${BACKEND_URL}/accommodation/recommendation`)
    .then((json) => json.data)
    .catch((error) => {
      throw error;
    });
}

export default recommendHotel;
