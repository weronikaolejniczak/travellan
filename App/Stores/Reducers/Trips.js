import TRIPS from '../../Data/DummyData';
import {CREATE_TRIP, DELETE_TRIP} from '../Actions/Trips';
import Trip from '../../Models/TripModel';

const initialState = {
  availableTrips: TRIPS,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TRIP:
      const newTrip = new Trip(
        new Date().toString(),
        1,
        action.tripData.destination,
        '',
        action.tripData.startDate,
        action.tripData.endDate,
        action.tripData.budget,
        {},
        {},
        {},
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
