/** MODELS */
import Trip from 'myTrips/models/Trip';

/** ACTIONS */
// Trips.
import {SET_TRIPS, DELETE_TRIP, CREATE_TRIP} from 'myTrips/state/Actions';

// Transport.
import {
  SET_TRANSPORT,
  DELETE_TRANSPORT,
  CREATE_TRANSPORT,
} from 'transport/state/Actions';

// Accommodation.
import {
  SET_RESERVATIONS,
  DELETE_RESERVATION,
  CREATE_RESERVATION,
} from 'accommodation/state/Actions';

// Notes.
import {CREATE_NOTE, DELETE_NOTE, SET_NOTES} from 'notes/state/Actions';

// Budget.
import {
  FETCH_BUDGET,
  SUBTRACT_FROM_BUDGET,
  ADD_TO_BUDGET,
} from 'budget/state/Actions';
import { UPDATE_QR } from '../../domains/transport/state/Actions';

/** COMMON REDUCER */
export const initialState = {
  availableTrips: [],
};

export default (state = initialState, action) => {
  const tripId = action.tripId;
  const tripIndex = state.availableTrips.findIndex(
    (trip) => trip.id === tripId,
  );
  // Copy the current trips and paste into updatedAvailableTrips array.
  const updatedAvailableTrips = [...state.availableTrips];

  switch (action.type) {
    /** TRIPS */
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

    /** TRANSPORT */
    case SET_TRANSPORT:
    case DELETE_TRANSPORT:
    case CREATE_TRANSPORT:
    case UPDATE_QR:
      updatedAvailableTrips[tripIndex].transportInfo = action.transportInfo;

      return {
        ...state,
        availableTrips: updatedAvailableTrips,
      };

    /** RESERVATIONS */
    case SET_RESERVATIONS:
    case DELETE_RESERVATION:
    case CREATE_RESERVATION:
      updatedAvailableTrips[tripIndex].accommodationInfo =
        action.accommodationInfo;

      return {
        ...state,
        availableTrips: updatedAvailableTrips,
      };

    /** NOTES */
    case SET_NOTES:
    case DELETE_NOTE:
    case CREATE_NOTE:
      updatedAvailableTrips[tripIndex].notes = action.notes;
      return {
        ...state,
        availableTrips: updatedAvailableTrips,
      };

    /** BUDGET */
    case FETCH_BUDGET:
    case SUBTRACT_FROM_BUDGET:
    case ADD_TO_BUDGET:
      updatedAvailableTrips[tripIndex].budget = action.budget;
      return {
        ...state,
        availableTrips: updatedAvailableTrips,
      };
  }
  return state;
};
