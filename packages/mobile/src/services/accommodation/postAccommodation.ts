import axios from 'axios';
import { FIREBASE_URL } from 'react-native-config';

const API_URL = FIREBASE_URL;

const postAccommodation = async (
  userId,
  token,
  tripId,
  amenities,
  breakfast,
  checkInExtra,
  checkInHours,
  checkOutHours,
  creditCardPaymentPossible,
  description,
  frontDesk24H,
  image,
  location,
  name,
  phone,
  reservationDetails,
) => {
  await axios
    .post(
      `${API_URL}/Trips/${userId}/${tripId}/accommodation.json?auth=${token}`,
      {
        amenities,
        breakfast,
        checkInExtra,
        checkInHours,
        checkOutHours,
        creditCardPaymentPossible,
        description,
        frontDesk24H,
        image,
        location,
        name,
        phone,
        reservationDetails,
      },
    )
    .catch(() => {
      throw new Error('Cannot create accommodation!');
    });
};

export default postAccommodation;
