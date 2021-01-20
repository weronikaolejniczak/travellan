import produceImmer from 'helpers/produceImmer';

import {
  CREATE_ACCOMMODATION,
  DELETE_ACCOMMODATION,
  SET_ACCOMMODATION,
  SET_PDF_ACC,
} from 'actions/accommodationActions';
import {
  CREATE_NOTE,
  DELETE_NOTE,
  EDIT_NOTE,
  SET_NOTES,
} from 'actions/notesActions';
import {
  CREATE_TRANSPORT,
  DELETE_TRANSPORT,
  SET_PDF,
  SET_QR,
  SET_TRANSPORT,
} from 'actions/transportActions';
import {
  CREATE_TRIP,
  DELETE_TRIP,
  EDIT_TRIP,
  SET_TRIPS,
} from 'actions/tripsActions';
import { SET_BUDGET } from 'actions/budgetActions';
import { SET_MAP } from 'actions/mapActions';

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
        draft.trips = draft.trips.filter((item) => item.id !== tripId);
        break;

      case CREATE_TRIP:
        draft.trips = draft.trips.concat(action.newTrip);
        break;

      case EDIT_TRIP:
        draft.trips[tripIndex] = action.newTrips;
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
        draft.trips[tripIndex].transport[
          draft.trips[tripIndex].transport.findIndex(
            (item) => item.id === action.transportId,
          )
        ].QR = action.QR;
        break;
      case SET_PDF:
        draft.trips[tripIndex].transport[
          draft.trips[tripIndex].transport.findIndex(
            (item) => item.id === action.transportId,
          )
        ].PDF = action.PDF;
        break;

      case SET_ACCOMMODATION:
        draft.trips[tripIndex].accommodation = action.accommodation;
        break;
      case CREATE_ACCOMMODATION:
        draft.trips[tripIndex].accommodation = [
          ...draft.trips[tripIndex].accommodation,
          action.newAccommodation,
        ];
        break;
      case DELETE_ACCOMMODATION:
        draft.trips[tripIndex].accommodation = draft.trips[
          tripIndex
        ].accommodation.filter((item) => item.id !== action.accommodationId);
        break;

      case SET_PDF_ACC:
        draft.trips[tripIndex].transport[
          draft.trips[tripIndex].transport.findIndex(
            (item) => item.id === action.transportId,
          )
        ].PDF = action.PDF;
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
      case EDIT_NOTE:
        draft.trips[tripIndex].notes = [...draft.trips[tripIndex].notes];
        draft.trips[tripIndex].notes[action.noteId] = action.newNote;
        break;

      case SET_BUDGET:
        draft.trips[tripIndex].budget = action.budget;
        break;

      case SET_MAP:
        draft.trips[tripIndex].map = action.map;
        break;

      default:
        break;
    }
  });
};
