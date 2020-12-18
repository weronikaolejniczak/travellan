import axios from 'axios';
import {FIREBASE_URL} from 'react-native-dotenv';

import Transport from 'models/Transport';

export const SET_TRANSPORT = 'SET_TRANSPORT';
export const CREATE_TRANSPORT = 'CREATE_TRANSPORT';
export const DELETE_TRANSPORT = 'DELETE_TRANSPORT';

export const SET_QR = 'SET_QR';
export const SET_PDF = 'SET_PDF';

const API_URL = FIREBASE_URL;

export const setTransport = (tripId, transport) => {
  return {
    type: SET_TRANSPORT,
    tripId,
    transport,
  };
};

export const createTransport = (tripId, newTransport) => {
  return {
    type: CREATE_TRANSPORT,
    tripId,
    newTransport,
  };
};

export const deleteTransport = (tripId, transportId) => {
  return {
    type: DELETE_TRANSPORT,
    tripId,
    transportId,
  };
};

export const setQR = (tripId, ticketId, QR) => {
  return {
    type: SET_QR,
    tripId,
    ticketId,
    QR,
  };
};

export const setPDF = (tripId, PDF) => {
  return {
    type: SET_PDF,
    tripId,
    PDF,
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
          "Couldn't delete the transport. Are you sure it exists?",
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
          isTicketTo,
          isTicketFrom,
          dateOfDeparture,
          placeOfDeparture,
          QR,
          PDF,
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

export const patchQRRequest = (tripId, ticketId, QR) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await axios.get(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
    );
    const data = await response.json();

    let transport = data.transport;
    let ticketKey = transport.findIndex((item) => item.id === ticketId);

    await axios.patch(
      `${API_URL}/Trips/${userId}/${tripId}/transport/${ticketKey}.json?auth=${token}`,
      {QR},
    );

    await dispatch(setQR(tripId, ticketId, QR));
  };
};

export const patchPDFRequest = (tripId, ticketId, PDF) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await axios.get(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
    );
    const data = await response.json();

    let transport = data.transport;
    let ticketKey = transport.findIndex((item) => item.id === ticketId);

    await axios.patch(
      `${API_URL}/Trips/${userId}/${tripId}/transport/${ticketKey}.json?auth=${token}`,
      {PDF},
    );

    dispatch(setPDF(tripId, PDF));
  };
};
