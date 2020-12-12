import {SET_TRIPS, DELETE_TRIP, CREATE_TRIP} from 'actions/tripsActions';
import {SET_TRANSPORT, SET_QR, SET_PDF} from 'actions/transportActions';
import {SET_RESERVATIONS} from 'actions/accommodationActions';
import {SET_NOTES} from 'actions/notesActions';
import {SET_BUDGET} from 'actions/budgetActions';
import {SET_MAP} from 'actions/mapActions';

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

    case SET_TRANSPORT:
    case SET_QR:
    case SET_PDF:
      updatedAvailableTrips[tripIndex].transport = action.transport;

      return {
        ...state,
        availableTrips: updatedAvailableTrips,
      };

    case SET_RESERVATIONS:
      updatedAvailableTrips[tripIndex].accommodation = action.accommodation;

      return {
        ...state,
        availableTrips: updatedAvailableTrips,
      };

    case SET_NOTES:
      updatedAvailableTrips[tripIndex].notes = action.notes;
      return {
        ...state,
        availableTrips: updatedAvailableTrips,
      };

    case SET_BUDGET:
      updatedAvailableTrips[tripIndex].budget = action.budget;
      return {
        ...state,
        availableTrips: updatedAvailableTrips,
      };

    case SET_MAP:
      updatedAvailableTrips[tripIndex].map = action.map;
      return {
        ...state,
        availableTrips: updatedAvailableTrips,
      };
  }
  return state;
};
