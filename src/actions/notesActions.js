import axios from 'axios';
import {FIREBASE_URL} from 'react-native-dotenv';

import Note from 'models/Note';

export const SET_NOTES = 'SET_NOTES';

const API_URL = FIREBASE_URL;

export const setNotes = (tripId, notes) => {
  return {
    type: SET_NOTES,
    tripId,
    notes,
  };
};

export const fetchNotesRequest = (tripId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await axios.get(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
    );
    const data = await response.json();

    let notes = data.notes;

    dispatch(setNotes(tripId, notes));
  };
};

export const deleteNoteRequest = (tripId, noteId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await axios.get(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
    );
    const data = await response.json();

    let notes = data.notes.filter((note) => note.id !== noteId);

    await axios.patch(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
      {notes},
    );

    dispatch(setNotes(tripId, notes));
  };
};

export const createNoteRequest = (tripId, category, title, description) => {
  const newNote = new Note(new Date().toString(), category, title, description);

  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await axios.get(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
    );
    const data = await response.json();

    let notes = data.notes;
    notes === undefined ? (notes = [newNote]) : (notes = notes.concat(newNote));

    await axios.patch(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
      {notes},
    );

    dispatch(setNotes(tripId, notes));
  };
};
