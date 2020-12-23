import axios from 'axios';
import { FIREBASE_URL } from 'react-native-dotenv';

import Map from 'models/Map';

export const SET_MAP = 'SET_MAP';

const API_URL = FIREBASE_URL;

export const setMap = (tripId, map) => {
  return {
    type: SET_MAP,
    tripId,
    map,
  };
};

export const fetchMapRequest = (tripId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await axios.get(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
    );
    const data = await response.json();

    let map = data.map;

    dispatch(setMap(tripId, map));
  };
};

export const updateMapRequest = (tripId, markers, routes, region) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await axios.get(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
    );
    const data = await response.json();

    let map = data.map;
    let newMap = new Map(markers, routes, region);
    map = newMap;

    dispatch(setMap(tripId, map));
  };
};
