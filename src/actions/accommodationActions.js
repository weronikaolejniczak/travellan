import axios from 'axios';
import {FIREBASE_URL} from 'react-native-dotenv';

import Accommodation from 'models/Accommodation';

export const SET_ACCOMMODATION = 'SET_ACCOMMODATION';

const API_URL = FIREBASE_URL;

export const setAccommodation = (tripId, accommodation) => {
  return {
    type: SET_ACCOMMODATION,
    tripId,
    accommodation,
  };
};

export const fetchAccommodationRequest = (tripId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await axios.get(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
    );
    const data = await response.json();

    let accommodation = data.accommodation;

    dispatch(setAccommodation(tripId, accommodation));
  };
};

export const deleteAccommodationRequest = (tripId, reservationId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await axios.get(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
    );
    const data = await response.json();

    let accommodation = data.accommodation;
    accommodation = accommodation.filter(
      (item) => !(item.id === reservationId),
    );

    await axios.patch(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
      {accommodation},
    );

    dispatch(setAccommodation(tripId, accommodation));
  };
};

export const createAccommodationRequest = (
  tripId,
  name,
  address,
  facilities,
  hotelHours,
  description,
  reservationDetails,
) => {
  const newReservation = new Accommodation(
    new Date().toString(),
    name,
    address,
    facilities,
    hotelHours,
    {},
    '',
    description,
    reservationDetails,
  );

  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await axios.get(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
    );
    const data = await response.json();

    let accommodation = data.accommodation;
    accommodation === undefined
      ? (accommodation = [newReservation])
      : (accommodation = accommodation.concat(newReservation));

    await axios.patch(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
      {accommodation},
    );

    dispatch(setAccommodation(tripId, accommodation));
  };
};
