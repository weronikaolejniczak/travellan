import {SET_TRIPS, DELETE_TRIP, CREATE_TRIP} from 'actions/tripsActions';
import {SET_TRANSPORT, SET_QR, SET_PDF} from 'actions/transportActions';
import {SET_ACCOMMODATION} from 'actions/accommodationActions';
import {SET_NOTES} from 'actions/notesActions';
import {SET_BUDGET} from 'actions/budgetActions';
import {SET_MAP} from 'actions/mapActions';

export const initialState = {
  trips: [],
};

export default (state = initialState, action) => {
  const tripId = action.tripId;
  const tripIndex = state.trips.findIndex((trip) => trip.id === tripId);
  const updatedTrips = [...state.trips];

  switch (action.type) {
    case SET_TRIPS:
      return {
        trips: action.trips,
      };
    case DELETE_TRIP:
      return {
        ...state,
        trips: state.trips.filter((item) => item.id !== tripId),
      };
    case CREATE_TRIP:
      return {
        ...state,
        trips: state.trips.concat(action.newTrip),
      };

    case SET_TRANSPORT:
    case SET_QR:
    case SET_PDF:
      updatedTrips[tripIndex].transport = action.transport;

      return {
        ...state,
        trips: updatedTrips,
      };

    case SET_ACCOMMODATION:
      updatedTrips[tripIndex].accommodation = action.accommodation;

      return {
        ...state,
        trips: updatedTrips,
      };

    case SET_NOTES:
      updatedTrips[tripIndex].notes = action.notes;
      return {
        ...state,
        trips: updatedTrips,
      };

    case SET_BUDGET:
      updatedTrips[tripIndex].budget = action.budget;
      return {
        ...state,
        trips: updatedTrips,
      };

    case SET_MAP:
      updatedTrips[tripIndex].map = action.map;
      return {
        ...state,
        trips: updatedTrips,
      };
  }
  return state;
};
