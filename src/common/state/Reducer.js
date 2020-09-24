/* models */
import Trip from 'myTrips/models/Trip';
/* actions */
// trips
import {FETCH_TRIPS, DELETE_TRIP, CREATE_TRIP} from 'myTrips/state/Actions';
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
  FETCH_ACCOMMODATION,
  DELETE_ACCOMMODATION,
  CREATE_ACCOMMODATION,
} from 'accommodation/state/Actions';
// notes
import {FETCH_NOTES, DELETE_NOTE, CREATE_NOTE} from 'notes/state/Actions';
// budget
import {FETCH_BUDGET, UPDATE_BUDGET} from 'budget/state/Actions';
// map
import {FETCH_MAP, UPDATE_MAP} from 'map/state/Actions';

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
    case FETCH_TRIPS:
      return {
        ...state,
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
        action.tripData.region,
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
      updatedAvailableTrips[tripIndex].transport = action.transport;
      return {
        ...state,
        availableTrips: updatedAvailableTrips,
      };
    /* accommodation */
    case FETCH_ACCOMMODATION:
    case DELETE_ACCOMMODATION:
    case CREATE_ACCOMMODATION:
      /* updatedAvailableTrips[tripIndex].accommodation = action.accommodation;
      return {
        ...state,
        availableTrips: updatedAvailableTrips,
      }; */
      return {
        ...state,
        availableTrips: {
          ...state.availableTrips,
          [tripIndex]: {
            ...state.availableTrips[tripIndex],
            accommodation: action.accommodation,
          },
        },
      };
    /* notes */
    case FETCH_NOTES:
    case DELETE_NOTE:
    case CREATE_NOTE:
      updatedAvailableTrips[tripIndex].notes = action.notes;
      return {
        ...state,
        availableTrips: updatedAvailableTrips,
      };
      /* return {
        ...state,
        availableTrips: {
          ...state.availableTrips,
          [tripIndex]: {
            ...state.availableTrips[tripIndex],
            notes: action.notes,
          },
        },
      }; */
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
    case UPDATE_MAP:
      updatedAvailableTrips[tripIndex].map = action.map;
      return {
        ...state,
        availableTrips: updatedAvailableTrips,
      };
    /* default */
    default:
      return state;
  }
};
