import axios from 'axios';
import { FIREBASE_URL } from 'react-native-config';

import MapModel from 'models/Map';

export const SET_MAP = 'SET_MAP';

const API_URL = FIREBASE_URL;

export const setMap = (tripId: string, map) => {
  return {
    map,
    tripId,
    type: SET_MAP,
  };
};

export const fetchMapRequest = (tripId: string) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    axios
      .get(`${API_URL}/Trips/${userId}/${tripId}/map.json?auth=${token}`)
      .then((res) => res.data)
      .then((map) => {
        console.log('map on fetch:', JSON.stringify(map));

        dispatch(setMap(tripId, {}));
      })
      .catch(() => {
        throw new Error('Something went wrong while getting the map!');
      });
  };
};

export const patchMapRequest = (tripId: string, markers, region) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const map = MapModel({ nodes: markers, region });
    console.log('map on patch:', JSON.stringify(map));

    axios
      .patch(`${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`, {
        map,
      })
      .then(() => dispatch(setMap(tripId, map)))
      .catch(() => {
        throw new Error("Couldn't update the map!");
      });
  };
};
