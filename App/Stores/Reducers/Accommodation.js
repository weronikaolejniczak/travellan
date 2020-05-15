import {CREATE_RESERVATION, DELETE_RESERVATION} from '../Actions/Accommodation';
import Accommodation from '../../Models/AccommodationModel';
import Trip from '../../Models/TripModel';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_RESERVATION:
      const tripId = action.parentId;
      const tripIndex = state.availableTrips.findIndex(
        (trip) => trip.id === tripId,
      );

      const newReservation = new Accommodation(
        new Date().toString(), // DUMMY ID
        action.reservationData.name,
        action.reservationData.address,
        {},
        '',
        'Description',
        action.reservationData.reservationDetails,
      );

      const updatedTrip = new Trip(
        tripId,
        state.availableTrips[tripIndex].destination,
        state.availableTrips[tripIndex].region,
        state.availableTrips[tripIndex].imageUrl,
        state.availableTrips[tripIndex].startDate,
        state.availableTrips[tripIndex].endDate,
        state.availableTrips[tripIndex].budget,
        state.availableTrips[tripIndex].notes,
        state.availableTrips[tripIndex].transportInfo,
        state.availableTrips[tripIndex].accommodationInfo.concat(
          newReservation,
        ),
        state.availableTrips[tripIndex].pointsOfInterest,
      );

      const updatedAvailableTrips = [...state.availableTrips];
      updatedAvailableTrips[tripIndex] = updatedTrip;

      return {
        ...state,
        availableTrips: updatedAvailableTrips,
      };

    case DELETE_RESERVATION:
      return {
        ...state,
        availableTrips: state.availableTrips,
      };
  }

  return state;
};
