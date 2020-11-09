import {FIREBASE_URL} from 'react-native-dotenv';

import Note from 'notes/models/Note';

export const DELETE_NOTE = 'DELETE_NOTE';
export const CREATE_NOTE = 'CREATE_NOTE';
export const SET_NOTES = 'SET_NOTES';

const API_URL = FIREBASE_URL;

export const fetchNotes = (tripId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
    );

    const resData = await response.json();
    let notes = resData.notes;

    dispatch({type: SET_NOTES, tripId, notes});
  };
};

export const deleteNote = (tripId, noteId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
    );

    const resData = await response.json();
    let notes = resData.notes.filter((note) => note.id !== noteId);

    await fetch(`${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        notes,
      }),
    });

    dispatch({type: DELETE_NOTE, tripId});
  };
};

export const createNote = (tripId, category, title, description) => {
  const newNote = new Note(
    new Date().toString(), // DUMMY ID
    category,
    title,
    description,
  );

  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`,
    );

    const resData = await response.json();
    let notes = resData.notes;
    notes === undefined ? (notes = [newNote]) : (notes = notes.concat(newNote));

    await fetch(`${API_URL}/Trips/${userId}/${tripId}.json?auth=${token}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        notes,
      }),
    });

    dispatch({
      type: CREATE_NOTE,
      tripId,
      notes,
    });
  };
};
