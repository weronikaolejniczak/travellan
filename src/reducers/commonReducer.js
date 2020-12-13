import produce from 'immer';

import {SET_TRIPS, DELETE_TRIP, CREATE_TRIP} from 'actions/tripsActions';
import {SET_TRANSPORT, SET_QR, SET_PDF} from 'actions/transportActions';
import {SET_ACCOMMODATION} from 'actions/accommodationActions';
import {SET_NOTES} from 'actions/notesActions';
import {SET_BUDGET} from 'actions/budgetActions';
import {SET_MAP} from 'actions/mapActions';

export const initialState = {
  trips: [],
};

export default (state = initialState, action) => {
  return produce(state, (draft) => {
    const tripId = action.tripId;
    const tripIndex = draft.trips.findIndex((trip) => trip.id === tripId);
    const updatedTrips = [...draft.trips];

    switch (action.type) {
      case SET_TRIPS:
        return {
          trips: action.trips,
        };
      case DELETE_TRIP:
        return {
          ...draft,
          trips: draft.trips.filter((item) => item.id !== tripId),
        };
      case CREATE_TRIP:
        return {
          ...draft,
          trips: draft.trips.concat(action.newTrip),
        };

      case SET_TRANSPORT:
      case SET_QR:
      case SET_PDF:
        updatedTrips[tripIndex].transport = action.transport;

        return {
          ...draft,
          trips: updatedTrips,
        };

      case SET_ACCOMMODATION:
        updatedTrips[tripIndex].accommodation = action.accommodation;

        return {
          ...draft,
          trips: updatedTrips,
        };

      case SET_NOTES:
        updatedTrips[tripIndex].notes = action.notes;
        return {
          ...draft,
          trips: updatedTrips,
        };

      case SET_BUDGET:
        updatedTrips[tripIndex].budget = action.budget;
        return {
          ...draft,
          trips: updatedTrips,
        };

      case SET_MAP:
        updatedTrips[tripIndex].map = action.map;
        return {
          ...draft,
          trips: updatedTrips,
        };
    }

    return draft;
  });
};
