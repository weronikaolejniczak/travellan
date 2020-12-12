import { FIREBASE_URL } from 'react-native-dotenv';

import Trip from 'trips/models/Trip';
import Map from 'map/models/Map';
import fetchImage from 'common/services/fetchImage';
import fetchCoordinates from 'common/services/fetchCoordinates';
import { DELETE_TRIP, CREATE_TRIP, SET_TRIPS } from './tripTypes';

const API_URL = FIREBASE_URL;

export const fetchTrips = () => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const response = await fetch(
      `${API_URL}/Trips/${userId}.json?auth=${token}`,
    );

    const resData = await response.json();
    const loadedTrips = [];

    for (const key in resData) {
      loadedTrips.push(
        new Trip(
          key,
          resData[key].destination,
          resData[key].region,
          resData[key].image,
          resData[key].startDate,
          resData[key].endDate,
          resData[key].budget,
          resData[key].notes,
          resData[key].transportInfo,
          resData[key].accommodationInfo,
          resData[key].map,
        ),
      );
    }

    dispatch({type: SET_TRIPS, trips: loadedTrips});
  };
};

export const deleteTrip = (tripId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    await fetch(`${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`, {
      method: 'DELETE',
    });
    dispatch({type: DELETE_TRIP, tripId});
  };
};

export const createTrip = (destination, startDate, endDate, budget) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    let image = await fetchImage(destination);
    let location = await fetchCoordinates(destination);
    let region = {
      latitude: location.lat,
      longitude: location.lon,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    let notes = [];
    let transportInfo = [];
    let accommodationInfo = [];
    let map = new Map([], [], null);

    const response = await fetch(
      `${API_URL}/Trips/${userId}.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination,
          region,
          image,
          startDate,
          endDate,
          budget,
          notes,
          transportInfo,
          accommodationInfo,
          map,
        }),
      },
    );

    const resData = await response.json();
    dispatch({
      type: CREATE_TRIP,
      tripData: {
        id: resData.name,
        destination,
        region,
        image,
        startDate,
        endDate,
        budget,
        notes,
        transportInfo,
        accommodationInfo,
        map,
      },
    });
  };
};
