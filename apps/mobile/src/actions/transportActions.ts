import axios from 'axios';
import { FIREBASE_URL } from 'react-native-config';

import TransportModel from 'models/Transport';

export const SET_TRANSPORT = 'SET_TRANSPORT';
export const CREATE_TRANSPORT = 'CREATE_TRANSPORT';
export const DELETE_TRANSPORT = 'DELETE_TRANSPORT';
export const SET_QR = 'SET_QR';
export const SET_PDF = 'SET_PDF';

const API_URL = FIREBASE_URL;

export const setTransport = (tripId: string, transport) => {
  return {
    transport,
    tripId,
    type: SET_TRANSPORT,
  };
};

export const createTransport = (tripId: string, newTransport) => {
  return {
    newTransport,
    tripId,
    type: CREATE_TRANSPORT,
  };
};

export const deleteTransport = (tripId: string, transportId: string) => {
  return {
    transportId,
    tripId,
    type: DELETE_TRANSPORT,
  };
};

export const setQR = (tripId: string, transportId: string, QR) => {
  return {
    QR,
    transportId,
    tripId,
    type: SET_QR,
  };
};

export const setPDF = (tripId: string, transportId: string, PDF) => {
  return {
    PDF,
    transportId,
    tripId,
    type: SET_PDF,
  };
};

export const fetchTransportRequest = (tripId: string) => {
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
            TransportModel({
              PDF: transport[key].PDF,
              QR: transport[key].QR,
              dateOfDeparture: transport[key].dateOfDeparture,
              id: key,
              isTicketFrom: transport[key].isTicketFrom,
              isTicketTo: transport[key].isTicketTo,
              placeOfDeparture: transport[key].placeOfDeparture,
            }),
          );
        }

        dispatch(setTransport(tripId, loadedTransport));
      })
      .catch(() => {
        throw new Error('Something went wrong while getting your transport!');
      });
  };
};

export const deleteTransportRequest = (tripId: string, transportId: string) => {
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
  tripId: string,
  isTicketTo,
  isTicketFrom,
  dateOfDeparture,
  placeOfDeparture,
  //qR,
  //pDF,
) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    axios
      .post(
        `${API_URL}/Trips/${userId}/${tripId}/transport.json?auth=${token}`,
        {
          //pDF,
          //qR,
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
        const newTransport = TransportModel({
          //requestConfig.PDF,
          //requestConfig.QR,
          dateOfDeparture: requestConfig.dateOfDeparture,
          id: transportId,
          isTicketFrom: requestConfig.isTicketFrom,
          isTicketTo: requestConfig.isTicketTo,
          placeOfDeparture: requestConfig.placeOfDeparture,
        });
        dispatch(createTransport(tripId, newTransport));
      })
      .catch(() => {
        throw new Error('Cannot create transport!');
      });
  };
};

export const deleteQRRequest = (tripId: string, transportId: string, QR) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    axios
      .delete(
        `${API_URL}/Trips/${userId}/${tripId}/transport/${transportId}/QR.json?auth=${token}`,
      )
      .then(() => dispatch(setQR(tripId, transportId, QR)))
      .catch(() => {
        throw new Error("Couldn't delete the QR code!");
      });
  };
};

export const addQRRequest = (tripId: string, transportId: string, QR) => {
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
        throw new Error("Couldn't update the QR code!");
      });
  };
};

export const deletePDFRequest = (tripId: string, transportId: string, PDF) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    axios
      .delete(
        `${API_URL}/Trips/${userId}/${tripId}/transport/${transportId}/PDF.json?auth=${token}`,
      )
      .then(() => dispatch(setPDF(tripId, transportId, PDF)))
      .catch(() => {
        throw new Error("Couldn't delete PDF!");
      });
  };
};

export const addPDFRequest = (tripId: string, transportId: string, PDF) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    axios
      .patch(
        `${API_URL}/Trips/${userId}/${tripId}/transport/${transportId}.json?auth=${token}`,
        {
          PDF,
        },
      )
      .then(() => dispatch(setPDF(tripId, transportId, PDF)))
      .catch(() => {
        throw new Error("Couldn't update PDF");
      });
  };
};
