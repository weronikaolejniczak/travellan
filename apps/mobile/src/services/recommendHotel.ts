import axios from 'axios';
import { BACKEND_URL } from 'react-native-config';

async function recommendHotel(
  latitude,
  longitude,
  checkInDate,
  checkOutDate,
  adults,
  roomQuantity,
) {
  return await axios
    .get(
      `${BACKEND_URL}/accommodation/recommendation?latitude=${latitude}&longitude=${longitude}&radius=30&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adults=${adults}&roomQuantity=${roomQuantity}`,
    )
    .then((json) => json.data)
    .catch((error) => {
      throw error;
    });
}

export default recommendHotel;
