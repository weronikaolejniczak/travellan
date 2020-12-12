import axios from 'axios';
import {FIREBASE_URL} from 'react-native-dotenv';

import Transport from 'domains/transport/models/Transport';
import {SET_TRANSPORT, SET_QR, SET_PDF} from './transportTypes';

const API_URL = FIREBASE_URL;

export const setTransport = (tripId, transport) => {
  return {
    type: SET_TRANSPORT,
    tripId,
    transport,
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

    await axios
      .get(`${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`)
      .then((res) => res.json())
      .then((data) => dispatch(setTransport(tripId, data.transport)));
  };
};

export const deleteTransportRequest = (tripId, ticketId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await axios.get(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
    );
    const data = await response.json();

    let transport = data.transport;
    transport = transport.filter((item) => !(item.id === ticketId));

    await axios.patch(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
      {transport},
    );

    dispatch(setTransport(tripId, transport));
  };
};

export const createTransportRequest = (
  tripId,
  to,
  from,
  date,
  place,
  QR,
  PDF,
) => {
  const newTransport = new Transport(
    new Date().toString(),
    to,
    from,
    date,
    place,
    QR,
    PDF,
  );

  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await axios.get(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
    );
    const data = await response.json();

    let transport = data.transport;

    if (transport) {
      transport = transport.concat(newTransport);
    } else {
      transport = [newTransport];
    }

    await axios.patch(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
      {transport},
    );

    dispatch(setTransport(tripId, transport));
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
