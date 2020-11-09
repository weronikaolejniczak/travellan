import {FIREBASE_URL} from 'react-native-dotenv';

import Transport from 'transport/models/Transport';

export const SET_TRANSPORT = 'SET_TRANSPORT';
export const DELETE_TRANSPORT = 'DELETE_TRANSPORT';
export const CREATE_TRANSPORT = 'CREATE_TRANSPORT';
export const UPDATE_QR = 'UPDATE_QR';
export const UPDATE_PDF = 'UPDATE_PDF';

const API_URL = FIREBASE_URL;

export const fetchTransport = (tripId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
    );
    const resData = await response.json();
    let transportInfo = resData.transportInfo;

    dispatch({type: SET_TRANSPORT, tripId, transportInfo});
  };
};

export const updateQR = (tripId, ticketId, qr) => {
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
          qr,
        }),
      },
    );

    await dispatch({type: UPDATE_QR, tripId, ticketId, qr});
  };
};

export const updatePDF = (tripId, ticketId, pdfUri) => {
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
          pdfUri,
        }),
      },
    );

    dispatch({type: UPDATE_PDF, tripId, pdfUri});
  };
};

export const deleteTransport = (tripId, ticketId) => {
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

    dispatch({type: DELETE_TRANSPORT, tripId});
  };
};

export const createTransport = (
  tripId,
  to,
  from,
  dateOfDeparture,
  placeOfDeparture,
  qr,
  pdfUri,
) => {
  const newTransport = new Transport(
    new Date().toString(), // DUMMY ID
    to,
    from,
    dateOfDeparture,
    placeOfDeparture,
    qr,
    pdfUri,
  );

  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
    );

    const resData = await response.json();
    let transportInfo = resData.transportInfo;
    transportInfo === undefined
      ? (transportInfo = [newTransport])
      : (transportInfo = transportInfo.concat(newTransport));

    await fetch(`${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transportInfo,
      }),
    });

    dispatch({
      type: CREATE_TRANSPORT,
      tripId,
      transportInfo,
    });
  };
};
