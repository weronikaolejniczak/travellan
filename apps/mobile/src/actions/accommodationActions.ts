import axios from 'axios';
import { FIREBASE_URL } from 'react-native-config';

import Accommodation from 'models/Accommodation';
import Accomodation from 'models/Accommodation';

export const SET_ACCOMMODATION = 'SET_ACCOMMODATION';
export const CREATE_ACCOMMODATION = 'CREATE_ACCOMMODATION';
export const DELETE_ACCOMMODATION = 'DELETE_ACCOMMODATION';
export const SET_PDF_ACC = 'SET_PDF_ACC';
export const EDIT_ACCOMMODATION = 'EDIT_ACCOMMODATION';

const API_URL = FIREBASE_URL;

export const setAccommodation = (tripId: string, accommodation) => {
  return {
    accommodation,
    tripId,
    type: SET_ACCOMMODATION,
  };
};

export const createAccommodation = (tripId: string, newAccommodation) => {
  return {
    newAccommodation,
    tripId,
    type: CREATE_ACCOMMODATION,
  };
};

export const deleteAccommodation = (tripId: string, accommodationId) => {
  return {
    accommodationId,
    tripId,
    type: DELETE_ACCOMMODATION,
  };
};

export const editAccommodation = (
  tripId: string,
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

export const setPDF = (tripId: string, accommodationId, PDF) => {
  return {
    PDF,
    accommodationId,
    tripId,
    type: SET_PDF_ACC,
  };
};

export const fetchAccommodationRequest = (tripId: string) => {
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
            Accomodation({
              PDF: accommodation[key].PDF,
              amenities: accommodation[key].amenities,
              breakfast: accommodation[key].breakfast,
              checkInExtra: accommodation[key].checkInExtra,
              checkInHours: accommodation[key].checkInHours,
              checkOutHours: accommodation[key].checkOutHours,
              creditCardPaymentPossible:
                accommodation[key].creditCardPaymentPossible,
              description: accommodation[key].description,
              frontDesk24H: accommodation[key].frontDesk24H,
              id: key,
              image: accommodation[key].image,
              location: accommodation[key].location,
              name: accommodation[key].name,
              phone: accommodation[key].phone,
              reservationDetails: accommodation[key].reservationDetails,
            }),
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

export const deleteAccommodationRequest = (tripId: string, accommodationId) => {
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
  tripId: string,
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
        const newAccommodation = Accommodation({
          PDF: requestConfig.PDF,
          amenities: requestConfig.amenities,
          breakfast: requestConfig.breakfast,
          checkInExtra: requestConfig.checkInExtra,
          checkInHours: requestConfig.checkInHours,
          checkOutHours: requestConfig.checkOutHours,
          creditCardPaymentPossible: requestConfig.creditCardPaymentPossible,
          description: requestConfig.description,
          frontDesk24H: requestConfig.frontDesk24H,
          id: accommodationId,
          image: requestConfig.image,
          location: requestConfig.location,
          name: requestConfig.name,
          phone: requestConfig.phone,
          reservationDetails: requestConfig.reservationDetails,
        });
        dispatch(createAccommodation(tripId, newAccommodation));
      })
      .catch(() => {
        throw new Error('Cannot create accommodation!');
      });
  };
};

export const editAccommodationRequest = (
  tripId: string,
  accommodationId: string,
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
        const updatedAccommodation = Accommodation({
          PDF,
          amenities,
          breakfast,
          checkInExtra,
          checkInHours,
          checkOutHours,
          creditCardPaymentPossible,
          description,
          frontDesk24H,
          id: accommodationId,
          image,
          location,
          name,
          phone,
          reservationDetails,
        });
        dispatch(
          editAccommodation(tripId, updatedAccommodation, accommodationId),
        );
      })
      .catch(() => {
        throw new Error('Cannot update accommodation!');
      });
  };
};

export const deletePDFRequest = (
  tripId: string,
  accommodationId: string,
  PDF,
) => {
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

export const addPDFRequest = (tripId: string, accommodationId: string, PDF) => {
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
