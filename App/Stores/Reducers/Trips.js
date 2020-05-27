import TRIPS from '../../Data/DummyData';
import {SET_TRIPS, DELETE_TRIP, CREATE_TRIP} from '../Actions/Trips';
import {DELETE_RESERVATION, CREATE_RESERVATION} from '../Actions/Accommodation';
import Trip from '../../Models/TripModel';
import {CREATE_NOTE, DELETE_NOTE} from '../Actions/Note';

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
        {
          latitude: 48.864716,
          longitude: 2.349014,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }, // refactor for fetched coordinates
        action.tripData.imageUrl,
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

    /** RESERVATIONS */
    // since DELETE_RESERVATION and CREATE_RESERVATION are the same, maybe case for both? if possible
    case DELETE_RESERVATION:
      // update the available trips, when in the particular trip's accommodation there is
      // everything except the reservation we'd like to delete;
      updatedAvailableTrips[tripIndex].accommodationInfo =
        action.accommodationInfo;

      return {
        ...state,
        availableTrips: updatedAvailableTrips,
      };

    case CREATE_RESERVATION:
      updatedAvailableTrips[tripIndex].accommodationInfo =
        action.accommodationInfo;

      return {
        ...state,
        availableTrips: updatedAvailableTrips,
      };
    case CREATE_NOTE:
    

      const updatedAvailableTrips = [...state.availableTrips];
      updatedAvailableTrips[tripIndex].notes =
        action.notes;

      return {
        ...state,
        availableTrips: updatedAvailableTrips,
      };
      case DELETE_NOTE:
      
      updatedAvailableTrips[tripIndex].notes =
        action.notes;

      return {
        ...state,
        availableTrips: updatedAvailableTrips,
      };

  }

  return state;
};
