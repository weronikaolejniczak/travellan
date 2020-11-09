import {FIREBASE_URL} from 'react-native-dotenv';

import Map from 'map/models/Map';

export const FETCH_MAP = 'FETCH_MAP';
export const UPDATE_MAP = 'UPDATE_MAP';

const API_URL = FIREBASE_URL;

export const fetchMap = (tripId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
    );

    const resData = await response.json();
    let map = resData.map;

    dispatch({type: FETCH_MAP, tripId, map});
  };
};

export const updateMap = (tripId, markers, routes, region) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
    );

    const resData = await response.json();
    let map = resData.map;
    let newMap = new Map(markers, routes, region);
    map = newMap;

    dispatch({type: UPDATE_MAP, tripId, map});
  };
};
