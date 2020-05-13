import TRIPS from '../../Data/DummyData';
import {CREATE_TRIP, DELETE_TRIP} from '../Actions/Trips';
import Trip from '../../Models/TripModel';

export const initialState = {
  availableTrips: TRIPS,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TRIP:
      const newTrip = new Trip(
        new Date().toString(), // DUMMY ID
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

    case DELETE_TRIP:
      return {
        ...state,
        availableTrips: state.availableTrips.filter(
          (item) => item.id !== action.pid,
        ),
      };
  }

  return state;
};
