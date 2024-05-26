import axios from 'axios';
import { FIREBASE_URL } from 'react-native-config';

import MapModel from 'models/Map';
import TripModel from 'models/Trip';
import { fetchCoordinates, fetchDestinationImage } from 'services';

export const SET_TRIPS = 'SET_TRIPS';
export const DELETE_TRIP = 'DELETE_TRIP';
export const CREATE_TRIP = 'CREATE_TRIP';
export const EDIT_TRIP = 'EDIT_TRIP';

const API_URL = FIREBASE_URL;

export const setTrips = (loadedTrips) => {
  return {
    trips: loadedTrips,
    type: SET_TRIPS,
  };
};

export const deleteTrip = (tripId: string) => {
  return {
    tripId,
    type: DELETE_TRIP,
  };
};
export const editTrip = (tripId: string, updatedTrip) => {
  return {
    tripId,
    type: EDIT_TRIP,
    updatedTrip,
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
            TripModel({
              accommodation: data[key].accommodation,
              budget: data[key].budget,
              cityCode: data[key].cityCode,
              destination: data[key].destination,
              endDate: data[key].endDate,
              id: key,
              image: data[key].image,
              map: data[key].map,
              notes: data[key].notes,
              region: data[key].region,
              startDate: data[key].startDate,
              transport: data[key].transport,
            }),
          );
        }

        dispatch(setTrips(loadedTrips));
      });
  };
};

export const deleteTripRequest = (tripId: string) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    axios({
      method: 'DELETE',
      url: `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
    })
      .then((res) => res.data)
      .then(() => {
        dispatch(deleteTrip(tripId));
      })
      .catch(() => {
        throw new Error('');
      });
  };
};

export const createTripRequest = (destination, startDate, endDate, budget) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const city = destination.split(',')[0];
    const image = await fetchDestinationImage(city);
    const location = await fetchCoordinates(destination);
    const region = {
      latitude: location.lat,
      latitudeDelta: 0.0922,
      longitude: location.lon,
      longitudeDelta: 0.0421,
    };
    const transport: never[] = [];
    const accommodation: never[] = [];
    const notes: never[] = [];
    const map = MapModel({ nodes: [], region: null });

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
        const newTrip = TripModel({
          accommodation,
          budget,
          destination,
          endDate,
          image,
          map,
          id: data.name,
          notes,
          region,
          startDate,
          transport,
        });

        dispatch(createTrip(newTrip));
      });
  };
};

export const editTripRequest = (
  tripId: string,
  destination: string,
  startDate: Date,
  endDate: Date,
  budget,
  transport,
  accommodation,
  notes,
  map,
) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const city = destination.split(',')[0];
    const image = await fetchDestinationImage(city);
    const location = await fetchCoordinates(destination);
    const region = {
      latitude: location.lat,
      latitudeDelta: 0.0922,
      longitude: location.lon,
      longitudeDelta: 0.0421,
    };

    await axios
      .put(`${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`, {
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
      .then(() => {
        const updatedTrip = TripModel({
          accommodation,
          budget,
          destination,
          endDate,
          id: tripId,
          image,
          map,
          notes,
          region,
          startDate,
          transport,
        });

        dispatch(editTrip(tripId, updatedTrip));
      });
  };
};
