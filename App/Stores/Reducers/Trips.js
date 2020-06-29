import TRIPS from '../../Data/DummyData';
/** MODELS */
import Trip from '../../Models/TripModel';
/** ACTIONS */
import {SET_TRIPS, DELETE_TRIP, CREATE_TRIP} from '../Actions/Trips';
import {
  SET_TRANSPORT,
  DELETE_TRANSPORT,
  CREATE_TRANSPORT,
} from '../Actions/Transport';
import {
  SET_RESERVATIONS,
  DELETE_RESERVATION,
  CREATE_RESERVATION,
} from '../Actions/Accommodation';
import {CREATE_NOTE, DELETE_NOTE, SET_NOTES} from '../Actions/Note';

export const initialState = {
  availableTrips: TRIPS,
};

export default (state = initialState, action) => {
  const tripId = action.tripId;
  const tripIndex = state.availableTrips.findIndex(
    (trip) => trip.id === tripId,
  );

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

    /** TRANSPORT TICKETS */
    case SET_TRANSPORT:
    case DELETE_TRANSPORT:
    case CREATE_TRANSPORT:
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
  }

  return state;
};
