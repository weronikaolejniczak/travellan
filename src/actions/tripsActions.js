import axios from 'axios';
import { FIREBASE_URL } from 'react-native-dotenv';

import Map from 'models/Map';
import Trip from 'models/Trip';
import fetchCoordinates from 'services/fetchCoordinates';
import fetchDestinationImage from 'services/fetchDestinationImage';
import fetchCityCode from 'services/fetchCityCode';

export const SET_TRIPS = 'SET_TRIPS';
export const DELETE_TRIP = 'DELETE_TRIP';
export const CREATE_TRIP = 'CREATE_TRIP';

const API_URL = FIREBASE_URL;

export const setTrips = (loadedTrips) => {
  return {
    trips: loadedTrips,
    type: SET_TRIPS,
  };
};

export const deleteTrip = (tripId) => {
  return {
    tripId,
    type: DELETE_TRIP,
  };
};

export const createTrip = (newTrip) => {
  return {
    newTrip,
    type: CREATE_TRIP,
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
              data[key].transport,
              data[key].accommodation,
              data[key].budget,
              data[key].notes,
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

    axios({
      method: 'DELETE',
      url: `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
    })
      .then((res) => res.data)
      .then((data) => {
        dispatch(deleteTrip(tripId));
      })
      .catch((error) => {
        throw new Error('');
      });
  };
};

export const createTripRequest = (destination, startDate, endDate, budget) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const image = await fetchDestinationImage(destination);
    const location = await fetchCoordinates(destination);
    const region = {
      latitude: location.lat,
      latitudeDelta: 0.0922,
      longitude: location.lon,
      longitudeDelta: 0.0421,
    };
    const transport = [];
    const accommodation = [];
    const notes = [];
    const map = new Map([], [], null);

    await axios
      .post(`${API_URL}/Trips/${userId}.json?auth=${token}`, {
        accommodation,
        budget,
        destination,
        endDate,
        image,
        map,
        notes,
        region,
        startDate,
        transport,
      })
      .then((res) => res.data)
      .then((data) => {
        const newTrip = new Trip(
          data.name,
          destination,
          region,
          image,
          startDate,
          endDate,
          transport,
          accommodation,
          budget,
          notes,
          map,
        );

        dispatch(createTrip(newTrip));
      });
  };
};
