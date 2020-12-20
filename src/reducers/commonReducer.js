import produceImmer from 'utilities/produceImmer';

import {SET_TRIPS, DELETE_TRIP, CREATE_TRIP} from 'actions/tripsActions';
import {
  SET_TRANSPORT,
  CREATE_TRANSPORT,
  DELETE_TRANSPORT,
  SET_QR,
  SET_PDF,
} from 'actions/transportActions';
import {SET_ACCOMMODATION} from 'actions/accommodationActions';
import {SET_NOTES, CREATE_NOTE, DELETE_NOTE} from 'actions/notesActions';
import {SET_BUDGET} from 'actions/budgetActions';
import {SET_MAP} from 'actions/mapActions';

export const initialState = {
  trips: [],
};

export default (state = initialState, action) => {
  return produceImmer(state, (draft) => {
    const tripId = action.tripId;
    const tripIndex = draft.trips.findIndex((trip) => trip.id === tripId);

    switch (action.type) {
      case SET_TRIPS:
        draft.trips = action.trips;
        break;

      case DELETE_TRIP:
        const filteredTrips = draft.trips.filter((item) => item.id !== tripId);
        draft.trips = filteredTrips;
        break;

      case CREATE_TRIP:
        draft.trips = draft.trips.concat(action.newTrip);
        break;

      case SET_TRANSPORT:
        draft.trips[tripIndex].transport = action.transport;
        break;
      case CREATE_TRANSPORT:
        draft.trips[tripIndex].transport = [
          ...draft.trips[tripIndex].transport,
          action.newTransport,
        ];
        break;
      case DELETE_TRANSPORT:
        draft.trips[tripIndex].transport = draft.trips[
          tripIndex
        ].transport.filter((item) => item.id !== action.transportId);
        break;

      case SET_QR:
      case SET_PDF:
        draft.trips[tripIndex].transport = action.transport;
        break;

      case SET_ACCOMMODATION:
        draft.trips[tripIndex].accommodation = action.accommodation;
        break;

      case SET_NOTES:
        draft.trips[tripIndex].notes = action.notes;
        break;
      case CREATE_NOTE:
        draft.trips[tripIndex].notes = [
          ...draft.trips[tripIndex].notes,
          action.newNote,
        ];
        break;
      case DELETE_NOTE:
        draft.trips[tripIndex].notes = draft.trips[tripIndex].notes.filter(
          (item) => item.id !== action.noteId,
        );
        break;

      case SET_BUDGET:
        draft.trips[tripIndex].budget = action.budget;
        break;

      case SET_MAP:
        draft.trip[tripIndex].map = action.map;
        break;

      default:
        break;
    }
  });
};
