import {SET_TRIPS, DELETE_TRIP, CREATE_TRIP} from 'actions/tripsActions';
import * as transportTypes from 'actions/transportTypes';
import {
  SET_RESERVATIONS,
  DELETE_RESERVATION,
  CREATE_RESERVATION,
} from 'actions/accommodationActions';
import {CREATE_NOTE, DELETE_NOTE, SET_NOTES} from 'actions/notesActions';
import {FETCH_BUDGET, UPDATE_BUDGET} from 'actions/budgetActions';
import {FETCH_MAP, UPDATE_MAP} from 'actions/mapActions';

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
      return {
        ...state,
        availableTrips: state.availableTrips.concat(action.newTrip),
      };

    case transportTypes.SET_TRANSPORT:
    case transportTypes.DELETE_TRANSPORT:
    case transportTypes.CREATE_TRANSPORT:
    case transportTypes.UPDATE_QR:
    case transportTypes.UPDATE_PDF:
      updatedAvailableTrips[tripIndex].transport = action.transport;

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
