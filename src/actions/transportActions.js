import axios from 'axios';
import {FIREBASE_URL} from 'react-native-dotenv';

import Transport from 'domains/transport/models/Transport';

import {
  SET_TRANSPORT,
  DELETE_TRANSPORT,
  CREATE_TRANSPORT,
  UPDATE_QR,
  UPDATE_PDF,
} from './transportTypes';

const API_URL = FIREBASE_URL;

export const setTransport = (tripId, transport) => {
  return {
    type: SET_TRANSPORT,
    tripId,
    transport,
  };
};

export const deleteTransport = (tripId, transport) => {
  return {
    type: DELETE_TRANSPORT,
    tripId,
    transport,
  };
};

export const createTransport = (tripId, transport) => {
  return {
    type: CREATE_TRANSPORT,
    tripId,
    transport,
  };
};

export const fetchTransport = (tripId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    axios
      .get(`${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`)
      .then((res) => res.json())
      .then((data) => dispatch(setTransport(tripId, data.transport)));
  };
};

export const patchDeleteTransport = (tripId, ticketId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
    );

    const resData = await response.json();
    let transportInfo = resData.transportInfo;
    transportInfo = transportInfo.filter((item) => !(item.id === ticketId));

    await fetch(`${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transportInfo,
      }),
    });

    dispatch(deleteTransport());
  };
};

export const patchCreateTransport = (
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
    const response = await fetch(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
    );
    const resData = await response.json();

    let transportInfo = resData.transportInfo;

    if (transportInfo) {
      transportInfo = transportInfo.concat(newTransport);
    } else {
      transportInfo = [newTransport];
    }

    await fetch(`${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transportInfo,
      }),
    });

    dispatch(createTransport());
  };
};

export const updateQR = (tripId, ticketId, QR) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
    );
    const resData = await response.json();
    let transportInfo = resData.transportInfo;
    let ticketKey = transportInfo.findIndex((item) => item.id === ticketId);

    await fetch(
      `${API_URL}/Trips/${userId}/${tripId}/transportInfo/${ticketKey}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          QR,
        }),
      },
    );

    await dispatch({type: UPDATE_QR, tripId, ticketId, QR});
  };
};

export const updatePDF = (tripId, ticketId, PDF) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
    );

    const resData = await response.json();
    let transportInfo = resData.transportInfo;
    let ticketKey = transportInfo.findIndex((item) => item.id === ticketId);
    await fetch(
      `${API_URL}/Trips/${userId}/${tripId}/transportInfo/${ticketKey}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          PDF,
        }),
      },
    );

    dispatch({type: UPDATE_PDF, tripId, PDF});
  };
};
