import TRIPS from '../../Data/DummyData';
import {SET_TRIPS, DELETE_TRIP, CREATE_TRIP} from '../Actions/Trips';
import {DELETE_RESERVATION, CREATE_RESERVATION} from '../Actions/Accommodation';
import Accommodation from '../../Models/AccommodationModel';
import Trip from '../../Models/TripModel';

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
      return {
        ...state,
        availableTrips: state.availableTrips,
      };

    case CREATE_RESERVATION:
      const tripId = action.tripId;
      const tripIndex = state.availableTrips.findIndex(
        (trip) => trip.id === tripId,
      );
      console.log(`3. reducer with passed ${tripId}`);

      const updatedAvailableTrips = [...state.availableTrips];
      updatedAvailableTrips[tripIndex].accommodationInfo =
        action.accommodationInfo;

      return {
        ...state,
        availableTrips: updatedAvailableTrips,
      };
  }

  return state;
};
