import axios from 'axios';
import { FIREBASE_URL } from 'react-native-dotenv';

import Transport from 'models/Transport';

export const SET_TRANSPORT = 'SET_TRANSPORT';
export const CREATE_TRANSPORT = 'CREATE_TRANSPORT';
export const DELETE_TRANSPORT = 'DELETE_TRANSPORT';
export const SET_QR = 'SET_QR';
export const SET_PDF = 'SET_PDF';

const API_URL = FIREBASE_URL;

export const setTransport = (tripId, transport) => {
  return {
    transport,
    tripId,
    type: SET_TRANSPORT,
  };
};

export const createTransport = (tripId, newTransport) => {
  return {
    newTransport,
    tripId,
    type: CREATE_TRANSPORT,
  };
};

export const deleteTransport = (tripId, transportId) => {
  return {
    transportId,
    tripId,
    type: DELETE_TRANSPORT,
  };
};

export const setQR = (tripId, transportId, QR) => {
  return {
    QR,
    transportId,
    tripId,
    type: SET_QR,
  };
};

export const setPDF = (tripId, transportId, PDF) => {
  return {
    PDF,
    transportId,
    tripId,
    type: SET_PDF,
  };
};

export const fetchTransportRequest = (tripId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    axios
      .get(`${API_URL}/Trips/${userId}/${tripId}/transport.json?auth=${token}`)
      .then((res) => res.data)
      .then((transport) => {
        const loadedTransport = [];
        for (const key in transport) {
          loadedTransport.push(
            new Transport(
              key,
              transport[key].isTicketTo,
              transport[key].isTicketFrom,
              transport[key].dateOfDeparture,
              transport[key].placeOfDeparture,
              transport[key].QR,
              transport[key].PDF,
            ),
          );
        }

        dispatch(setTransport(tripId, loadedTransport));
      })
      .catch(() => {
        throw new Error('Something went wrong while getting your transport!');
      });
  };
};

export const deleteTransportRequest = (tripId, transportId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    axios
      .delete(
        `${API_URL}/Trips/${userId}/${tripId}/transport/${transportId}.json?auth=${token}`,
      )
      .then(() => {
        dispatch(deleteTransport(tripId, transportId));
      })
      .catch(() => {
        throw new Error(
          `Couldn't delete the transport. Are you sure it exists?`,
        );
      });
  };
};

export const createTransportRequest = (
  tripId,
  isTicketTo,
  isTicketFrom,
  dateOfDeparture,
  placeOfDeparture,
  QR,
  PDF,
) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    axios
      .post(
        `${API_URL}/Trips/${userId}/${tripId}/transport.json?auth=${token}`,
        {
          PDF,
          QR,
          dateOfDeparture,
          isTicketFrom,
          isTicketTo,
          placeOfDeparture,
        },
      )
      .then((res) => [res.data, unescape(res.config.data)])
      .then((data) => {
        const transportId = data[0].name;
        const requestConfig = JSON.parse(data[1]);
        const newTransport = new Transport(
          transportId,
          requestConfig.isTicketTo,
          requestConfig.isTicketFrom,
          requestConfig.dateOfDeparture,
          requestConfig.placeOfDeparture,
          requestConfig.QR,
          requestConfig.PDF,
        );
        dispatch(createTransport(tripId, newTransport));
      })
      .catch(() => {
        throw new Error('Cannot create transport!');
      });
  };
};

export const patchQRRequest = (tripId, transportId, QR) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    axios
      .delete(
        `${API_URL}/Trips/${userId}/${tripId}/transport/${transportId}/QR.json?auth=${token}`,
      )
      .then(() => dispatch(setQR(tripId, transportId, QR)))
      .catch(() => {
        throw new Error(`Couldn't delete the QR code!`);
      });
  };
};

export const addQRRequest = (tripId, transportId, QR) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    axios
      .patch(
        `${API_URL}/Trips/${userId}/${tripId}/transport/${transportId}.json?auth=${token}`,
        {
          QR,
        },
      )
      .then(() => dispatch(setQR(tripId, transportId, QR)))
      .catch(() => {
        throw new Error(`Couldn't update the QR code!`);
      });
  };
};


export const patchPDFRequest = (tripId, transportId, PDF) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    console.log('√ tripId:', tripId);
    console.log('√ transportId:', transportId);
    console.log('√ PDF:', PDF);

    axios
      .get(
        `${API_URL}/Trips/${userId}/${tripId}/transport/${transportId}.json?auth=${token}`,
        {
          PDF,
        },
      )
      .then((res) => res.data)
      .then((data) => console.log('data returned from endpoint:', data));

    axios
      .patch(
        `${API_URL}/Trips/${userId}/${tripId}/transport/${transportId}.json?auth=${token}`,
        {
          PDF,
        },
      )
      .then(() => dispatch(setPDF(tripId, transportId, PDF)))
      .catch((err) => {
        console.error(err.message);
        throw new Error(`Couldn't update the PDF code! ${err.message}`);
      });
  };
};
