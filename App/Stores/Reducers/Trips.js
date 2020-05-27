import TRIPS from '../../Data/DummyData';
import {SET_TRIPS, DELETE_TRIP, CREATE_TRIP} from '../Actions/Trips';
import {DELETE_RESERVATION, CREATE_RESERVATION} from '../Actions/Accommodation';
import Trip from '../../Models/TripModel';
import { CREATE_NOTE } from '../Actions/Note';

export const initialState = {
  availableTrips: TRIPS,
};

export default (state = initialState, action) => {
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
    case DELETE_RESERVATION:
      // update the available trips, when in the particular trip's accommodation there is
      // everything except the reservation we'd like to delete;
      // could conflict with code in the case CREATE_RESERVATION - solve

      return {
        ...state,
        availableTrips: state.availableTrips,
      };

    case CREATE_RESERVATION:
      const tripId = action.tripId;
      const tripIndex = state.availableTrips.findIndex(
        (trip) => trip.id === tripId,
      );

      const updatedAvailableTrips = [...state.availableTrips];
      updatedAvailableTrips[tripIndex].accommodationInfo =
        action.accommodationInfo;

      return {
        ...state,
        availableTrips: updatedAvailableTrips,
      };
    case CREATE_NOTE:
      const TripIdForNotes = action.tripId;
      const TripIndexForNotes = state.availableTrips.findIndex(
        (trip) => trip.id === TripIdForNotes,
      );

      const updatedAvailableTripsForNotes = [...state.availableTrips];
      updatedAvailableTripsForNotes[TripIndexForNotes].notes =
        action.notes;

      return {
        ...state,
        availableTrips: updatedAvailableTripsForNotes,
      }
  }

  return state;
};
