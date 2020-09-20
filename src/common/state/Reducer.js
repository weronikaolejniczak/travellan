/* models */
import Trip from 'myTrips/models/Trip';
/* actions */
// trips
import {SET_TRIPS, DELETE_TRIP, CREATE_TRIP} from 'myTrips/state/Actions';
// transport
import {
  SET_TRANSPORT,
  DELETE_TRANSPORT,
  CREATE_TRANSPORT,
  UPDATE_PDF,
  UPDATE_QR,
} from 'transport/state/Actions';
// accommodation
import {
  SET_RESERVATIONS,
  DELETE_RESERVATION,
  CREATE_RESERVATION,
} from 'accommodation/state/Actions';
// notes
import {CREATE_NOTE, DELETE_NOTE, SET_NOTES} from 'notes/state/Actions';
// budget
import {FETCH_BUDGET, UPDATE_BUDGET} from 'budget/state/Actions';
// map
import {FETCH_MAP, CREATE_POI} from 'map/state/Actions';

/* common reducer */
export const initialState = {
  availableTrips: [],
};

export default (state = initialState, action) => {
  const tripId = action.tripId;
  const tripIndex = state.availableTrips.findIndex(
    (trip) => trip.id === tripId,
  );
  // copy the current trips and paste into updatedAvailableTrips array
  const updatedAvailableTrips = [...state.availableTrips];

  switch (action.type) {
    /* trips */
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
    /* transport */
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
    /* reservations */
    case SET_RESERVATIONS:
    case DELETE_RESERVATION:
    case CREATE_RESERVATION:
      updatedAvailableTrips[tripIndex].accommodationInfo =
        action.accommodationInfo;

      return {
        ...state,
        availableTrips: updatedAvailableTrips,
      };
    /* notes */
    case SET_NOTES:
    case DELETE_NOTE:
    case CREATE_NOTE:
      updatedAvailableTrips[tripIndex].notes = action.notes;
      return {
        ...state,
        availableTrips: updatedAvailableTrips,
      };
    /* budget */
    case FETCH_BUDGET:
    case UPDATE_BUDGET:
      updatedAvailableTrips[tripIndex].budget = action.budget;
      return {
        ...state,
        availableTrips: updatedAvailableTrips,
      };
    /* map */
    case FETCH_MAP:
    case CREATE_POI:
      updatedAvailableTrips[tripIndex].map = action.map;
      return {
        ...state,
        availableTrips: updatedAvailableTrips,
      };
  }
  return state;
};
