import axios from 'axios';
import { FIREBASE_URL } from 'react-native-dotenv';

import Accommodation from 'models/Accommodation';

export const SET_ACCOMMODATION = 'SET_ACCOMMODATION';
export const CREATE_ACCOMMODATION = 'CREATE_ACCOMMODATION';
export const DELETE_ACCOMMODATION = 'DELETE_ACCOMMODATION';

const API_URL = FIREBASE_URL;

export const setAccommodation = (tripId, accommodation) => {
  return {
    accommodation,
    tripId,
    type: SET_ACCOMMODATION,
  };
};

export const createAccommodation = (tripId, newAccommodation) => {
  return {
    newAccommodation,
    tripId,
    type: CREATE_ACCOMMODATION,
  };
};

export const deleteAccommodation = (tripId, accommodationId) => {
  return {
    accommodationId,
    tripId,
    type: DELETE_ACCOMMODATION,
  };
};

export const fetchAccommodationRequest = (tripId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    axios
      .get(
        `${API_URL}/Trips/${userId}/${tripId}/accommodation.json?auth=${token}`,
      )
      .then((res) => res.data)
      .then((accommodation) => {
        const loadedAccommodation = [];
        for (const key in accommodation) {
          loadedAccommodation.push(
            new Accommodation(
              key,
              accommodation[key].name,
              accommodation[key].address,
              accommodation[key].ammenities,
              accommodation[key].description,
              accommodation[key].hotelHours,
              accommodation[key].coordinates,
              accommodation[key].image,
              accommodation[key].description,
              accommodation[key].reservationDetails,
            ),
          );
        }

        dispatch(setAccommodation(tripId, loadedAccommodation));
      })
      .catch(() => {
        throw new Error(
          'Something went wrong while getting your accommodation!',
        );
      });
  };
};

export const deleteAccommodationRequest = (tripId, accommodationId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    axios
      .delete(
        `${API_URL}/Trips/${userId}/${tripId}/accommodation/${accommodationId}.json?auth=${token}`,
      )
      .then(() => {
        dispatch(deleteAccommodation(tripId, accommodationId));
      })
      .catch(() => {
        throw new Error(
          `Couldn't delete the accommodation. Are you sure it exists?`,
        );
      });
  };
};

export const createAccommodationRequest = (
  tripId,
  name,
  address,
  ammenities,
  hotelHours,
  coordinates,
  image,
  description,
  reservationDetails,
) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    axios
      .post(
        `${API_URL}/Trips/${userId}/${tripId}/accommodation.json?auth=${token}`,
        {
          address,
          ammenities,
          coordinates,
          description,
          hotelHours,
          image,
          name,
          reservationDetails,
        },
      )
      .then((res) => [res.data, unescape(res.config.data)])
      .then((data) => {
        const accommodationId = data[0].name;
        const requestConfig = JSON.parse(data[1]);
        const newAccommodation = new Accommodation(
          accommodationId,
          requestConfig.name,
          requestConfig.address,
          requestConfig.ammenities,
          requestConfig.hotelHours,
          requestConfig.coordinates,
          requestConfig.image,
          requestConfig.description,
          requestConfig.reservationDetails,
        );
        dispatch(createAccommodation(tripId, newAccommodation));
      })
      .catch(() => {
        throw new Error('Cannot create accommodation!');
      });
  };
};
