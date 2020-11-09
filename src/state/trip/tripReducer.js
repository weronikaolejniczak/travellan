import Trip from 'trips/models/Trip';

import {SET_TRIPS, DELETE_TRIP, CREATE_TRIP} from 'state/trip/tripActions';

import {
  SET_TRANSPORT,
  DELETE_TRANSPORT,
  CREATE_TRANSPORT,
  UPDATE_PDF,
  UPDATE_QR,
} from 'state/transport/transportActions';

import {
  SET_RESERVATIONS,
  DELETE_RESERVATION,
  CREATE_RESERVATION,
} from 'state/accommodation/accommodationActions';

import {CREATE_NOTE, DELETE_NOTE, SET_NOTES} from 'state/note/noteActions';

import {FETCH_BUDGET, UPDATE_BUDGET} from 'state/budget/budgetActions';

import {FETCH_MAP, UPDATE_MAP} from 'state/map/mapActions';

export const initialState = {
  availableTrips: [],
};

export default (state = initialState, action) => {
  const tripId = action.tripId;
  const tripIndex = state.availableTrips.findIndex(
    (trip) => trip.id === tripId,
  );
  const updatedAvailableTrips = [...state.availableTrips];

  switch (action.type) {
    case SET_TRIPS:
      return {
        availableTrips: action.trips,
      };
    case DELETE_TRIP:
      return {
        ...state,
        availableTrips: state.availableTrips.filter(
          (item) => item.id !== action.pid,
        ),
      };
    case CREATE_TRIP:
      const newTrip = new Trip(
        action.tripData.id,
        action.tripData.destination,
        action.tripData.region, // refactor for fetched coordinates
        action.tripData.image,
        action.tripData.startDate,
        action.tripData.endDate,
        action.tripData.budget,
        [],
        [],
        [],
        [],
      );
      return {
        ...state,
        availableTrips: state.availableTrips.concat(newTrip),
      };

    case SET_TRANSPORT:
    case DELETE_TRANSPORT:
    case CREATE_TRANSPORT:
    case UPDATE_QR:
    case UPDATE_PDF:
      updatedAvailableTrips[tripIndex].transportInfo = action.transportInfo;

      return {
        ...state,
        availableTrips: updatedAvailableTrips,
      };

    case SET_RESERVATIONS:
    case DELETE_RESERVATION:
    case CREATE_RESERVATION:
      updatedAvailableTrips[tripIndex].accommodation = action.accommodation;

      return {
        ...state,
        availableTrips: updatedAvailableTrips,
      };

    case SET_NOTES:
    case DELETE_NOTE:
    case CREATE_NOTE:
      updatedAvailableTrips[tripIndex].notes = action.notes;
      return {
        ...state,
        availableTrips: updatedAvailableTrips,
      };

    case FETCH_BUDGET:
    case UPDATE_BUDGET:
      updatedAvailableTrips[tripIndex].budget = action.budget;
      return {
        ...state,
        availableTrips: updatedAvailableTrips,
      };

    case FETCH_MAP:
    case UPDATE_MAP:
      updatedAvailableTrips[tripIndex].map = action.map;
      return {
        ...state,
        availableTrips: updatedAvailableTrips,
      };
  }
  return state;
};
