import axios from 'axios';
import {FIREBASE_URL} from 'react-native-dotenv';

import Map from 'domains/map/models/Map';
import Trip from 'domains/trips/models/Trip';
import fetchImage from 'services/fetchImage';
import fetchCoordinates from 'services/fetchCoordinates';

export const SET_TRIPS = 'SET_TRIPS';
export const DELETE_TRIP = 'DELETE_TRIP';
export const CREATE_TRIP = 'CREATE_TRIP';

const API_URL = FIREBASE_URL;

export const setTrips = (loadedTrips) => {
  return {
    type: SET_TRIPS,
    trips: loadedTrips,
  };
};

export const deleteTrip = (tripId) => {
  return {
    type: DELETE_TRIP,
    tripId,
  };
};

export const createTrip = (newTrip) => {
  return {
    type: CREATE_TRIP,
    newTrip,
  };
};

export const fetchTripsRequest = () => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const response = await axios.get(
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
          resData[key].transport,
          resData[key].accommodation,
          resData[key].map,
        ),
      );
    }

    dispatch(setTrips(loadedTrips));
  };
};

export const deleteTripRequest = (tripId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    await axios.delete(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
    );

    dispatch(deleteTrip(tripId));
  };
};

export const postTripRequest = (destination, startDate, endDate, budget) => {
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
    let transport = [];
    let accommodation = [];
    let map = new Map([], [], null);

    const response = await axios.post(
      `${API_URL}/Trips/${userId}.json?auth=${token}`,
      {
        destination,
        region,
        image,
        startDate,
        endDate,
        budget,
        notes,
        transport,
        accommodation,
        map,
      },
    );

    const data = await response.json();
    const tripId = data.id;
    const newTrip = new Trip(
      tripId,
      destination,
      region,
      image,
      startDate,
      endDate,
      budget,
      notes,
      transport,
      accommodation,
      map,
    );

    dispatch(createTrip(newTrip));
  };
};
