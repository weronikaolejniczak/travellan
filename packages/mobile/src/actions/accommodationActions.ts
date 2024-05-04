import axios from 'axios';
import { FIREBASE_URL } from 'react-native-config';

import Accommodation from 'models/Accommodation';

export const SET_ACCOMMODATION = 'SET_ACCOMMODATION';
export const CREATE_ACCOMMODATION = 'CREATE_ACCOMMODATION';
export const DELETE_ACCOMMODATION = 'DELETE_ACCOMMODATION';
export const SET_PDF_ACC = 'SET_PDF_ACC';
export const EDIT_ACCOMMODATION = 'EDIT_ACCOMMODATION';

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

export const editAccommodation = (
  tripId,
  updatedAccommodation,
  accommodationId,
) => {
  return {
    accommodationId,
    tripId,
    type: EDIT_ACCOMMODATION,
    updatedAccommodation,
  };
};

export const setPDF = (tripId, accommodationId, PDF) => {
  return {
    PDF,
    accommodationId,
    tripId,
    type: SET_PDF_ACC,
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
              accommodation[key].amenities,
              accommodation[key].breakfast,
              accommodation[key].checkInExtra,
              accommodation[key].checkInHours,
              accommodation[key].checkOutHours,
              accommodation[key].creditCardPaymentPossible,
              accommodation[key].description,
              accommodation[key].frontDesk24H,
              accommodation[key].image,
              accommodation[key].location,
              accommodation[key].name,
              accommodation[key].phone,
              accommodation[key].reservationDetails,
              accommodation[key].PDF,
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
          "Couldn't delete the accommodation. Are you sure it exists?",
        );
      });
  };
};

export const createAccommodationRequest = (
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
  PDF,
) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    axios
      .post(
        `${API_URL}/Trips/${userId}/${tripId}/accommodation.json?auth=${token}`,
        {
          PDF,
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
      .then((res) => [res.data, unescape(res.config.data)])
      .then((data) => {
        const accommodationId = data[0].name;
        const requestConfig = JSON.parse(data[1]);
        const newAccommodation = new Accommodation(
          accommodationId,
          requestConfig.amenities,
          requestConfig.breakfast,
          requestConfig.checkInExtra,
          requestConfig.checkInHours,
          requestConfig.checkOutHours,
          requestConfig.creditCardPaymentPossible,
          requestConfig.description,
          requestConfig.frontDesk24H,
          requestConfig.image,
          requestConfig.location,
          requestConfig.name,
          requestConfig.phone,
          requestConfig.reservationDetails,
          requestConfig.PDF,
        );
        dispatch(createAccommodation(tripId, newAccommodation));
      })
      .catch(() => {
        throw new Error('Cannot create accommodation!');
      });
  };
};

export const editAccommodationRequest = (
  tripId,
  accommodationId,
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
  PDF,
) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    await axios
      .patch(
        `${API_URL}/Trips/${userId}/${tripId}/accommodation/${accommodationId}.json?auth=${token}`,
        {
          PDF,
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

      .then(() => {
        const updatedAccommodation = new Accommodation(
          accommodationId,
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
          PDF,
        );
        dispatch(
          editAccommodation(tripId, updatedAccommodation, accommodationId),
        );
      })
      .catch(() => {
        throw new Error('Cannot update accommodation!');
      });
  };
};

export const deletePDFRequest = (tripId, accommodationId, PDF) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    axios
      .delete(
        `${API_URL}/Trips/${userId}/${tripId}/accommodation/${accommodationId}/PDF.json?auth=${token}`,
      )
      .then(() => dispatch(setPDF(tripId, accommodationId, PDF)))
      .catch(() => {
        throw new Error("Couldn't delete PDF!");
      });
  };
};

export const addPDFRequest = (tripId, accommodationId, PDF) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    axios
      .patch(
        `${API_URL}/Trips/${userId}/${tripId}/accommodation/${accommodationId}.json?auth=${token}`,
        {
          PDF,
        },
      )
      .then(() => dispatch(setPDF(tripId, accommodationId, PDF)))
      .catch(() => {
        throw new Error("Couldn't update PDF");
      });
  };
};
