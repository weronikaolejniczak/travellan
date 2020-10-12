import Note from 'notes/models/Note';

import {FETCH_NOTES, DELETE_NOTE, CREATE_NOTE} from './noteReducer';

export const fetchNotes = (tripId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://travellan-project.firebaseio.com/Trips/${userId}/${tripId}.json?auth=${token}`,
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();
      let notes = resData.notes;
      dispatch({type: FETCH_NOTES, tripId, notes});
    } catch (error) {
      throw error;
    }
  };
};

export const deleteNote = (tripId, noteId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://travellan-project.firebaseio.com/Trips/${userId}/${tripId}.json?auth=${token}`,
      );
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const resData = await response.json();
      let notes = resData.notes.filter((note) => note.id !== noteId);
      await fetch(
        `https://travellan-project.firebaseio.com/Trips/${userId}/${tripId}.json?auth=${token}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            notes,
          }),
        },
      );
      dispatch({type: DELETE_NOTE, tripId});
    } catch (error) {
      throw error;
    }
  };
};

export const createNote = (tripId, category, title, description) => {
  const newNote = new Note(new Date().toString(), category, title, description);
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://travellan-project.firebaseio.com/Trips/${userId}/${tripId}.json?auth=${token}`,
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();
      let notes = resData.notes;
      notes === undefined
        ? (notes = [newNote])
        : (notes = notes.concat(newNote));
      await fetch(
        `https://travellan-project.firebaseio.com/Trips/${userId}/${tripId}.json?auth=${token}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            notes,
          }),
        },
      );
      dispatch({
        type: CREATE_NOTE,
        tripId,
        notes,
      });
    } catch (error) {
      throw error;
    }
  };
};
