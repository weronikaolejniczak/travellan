import {FIREBASE_URL} from 'react-native-dotenv';

import Accommodation from 'domains/accommodation/models/Accommodation';

export const SET_RESERVATIONS = 'SET_RESERVATIONS';
export const DELETE_RESERVATION = 'DELETE_RESERVATION';
export const CREATE_RESERVATION = 'CREATE_RESERVATION';

const API_URL = FIREBASE_URL;

export const fetchAccommodation = (tripId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
    );

    const resData = await response.json();
    let accommodation = resData.accommodation;

    dispatch({type: SET_RESERVATIONS, tripId, accommodation});
  };
};

export const deleteAccommodation = (tripId, reservationId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
    );

    const resData = await response.json();
    let accommodation = resData.accommodation;
    accommodation = accommodation.filter(
      (item) => !(item.id === reservationId),
    );

    await fetch(`${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accommodation,
      }),
    });

    dispatch({type: DELETE_RESERVATION, tripId});
  };
};

export const createAccommodation = (
  tripId,
  name,
  address,
  facilities,
  hotelHours,
  description,
  reservationDetails,
) => {
  const newReservation = new Accommodation(
    new Date().toString(), // DUMMY ID
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
    const response = await fetch(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
    );

    const resData = await response.json();
    let accommodation = resData.accommodation;
    accommodation === undefined
      ? (accommodation = [newReservation])
      : (accommodation = accommodation.concat(newReservation));

    await fetch(`${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accommodation,
      }),
    });

    dispatch({
      type: CREATE_RESERVATION,
      tripId,
      accommodation,
    });
  };
};
