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

    await axios({
      method: 'GET',
      url: `${API_URL}/Trips/${userId}.json?auth=${token}`,
    })
      .then((res) => res.data)
      .then((data) => {
        const loadedTrips = [];
        for (const key in data) {
          loadedTrips.push(
            new Trip(
              key,
              data[key].destination,
              data[key].region,
              data[key].image,
              data[key].startDate,
              data[key].endDate,
              data[key].budget,
              data[key].notes,
              data[key].transport,
              data[key].accommodation,
              data[key].map,
            ),
          );
        }

        dispatch(setTrips(loadedTrips));
      });
  };
};

export const deleteTripRequest = (tripId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    await axios({
      method: 'DELETE',
      url: `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
    });

    dispatch(deleteTrip(tripId));
  };
};

export const createTripRequest = (destination, startDate, endDate, budget) => {
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

    await axios
      .post(`${API_URL}/Trips/${userId}.json?auth=${token}`, {
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
      })
      .then((res) => res.data)
      .then((data) => {
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
      });
  };
};
