import axios from 'axios';
import {FIREBASE_URL} from 'react-native-dotenv';

import Note from 'models/Note';

export const SET_NOTES = 'SET_NOTES';
export const CREATE_NOTE = 'CREATE_NOTE';

const API_URL = FIREBASE_URL;

export const setNotes = (tripId, notes) => {
  return {
    type: SET_NOTES,
    tripId,
    notes,
  };
};

export const createNote = (tripId, newNote) => {
  return {
    type: CREATE_NOTE,
    tripId,
    newNote,
  };
};

export const fetchNotesRequest = (tripId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    axios
      .get(`${API_URL}/Trips/${userId}/${tripId}/notes.json?auth=${token}`)
      .then((res) => res.data)
      .then((notes) => {
        const loadedNotes = [];
        for (const key in notes) {
          loadedNotes.push(
            new Note(
              key,
              notes[key].date,
              notes[key].category,
              notes[key].title,
              notes[key].description,
            ),
          );
        }

        dispatch(setNotes(tripId, loadedNotes));
      })
      .catch(() => {
        throw new Error('Something went wrong while getting your notes!');
      });
  };
};

export const deleteNoteRequest = (tripId, noteId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    axios
      .get(`${API_URL}/Trips/${userId}/${tripId}/notes.json?auth=${token}`)
      .then((res) => res.data)
      .then((notes) => {
        console.log('deleteNoteRequest: ', notes);
        const updatedNotes = notes.filter((item) => item.id !== noteId);
        const noteIndex = notes.findIndex((item) => item.id === noteId);
        axios
          .delete(
            `${API_URL}/Trips/${userId}/${tripId}/notes/${noteIndex}.json?auth=${token}`,
          )
          .catch((err) => console.log(JSON.stringify(err)));
        dispatch(setNotes(tripId, updatedNotes));
      })
      .catch(() => {
        throw new Error("Couldn't delete the note. Are you sure it exists?");
      });
  };
};

export const createNoteRequest = (tripId, category, title, description) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();

    axios
      .post(`${API_URL}/Trips/${userId}/${tripId}/notes.json?auth=${token}`, {
        date,
        category,
        title,
        description,
      })
      .then((res) => [res.data, unescape(res.config.data)])
      .then((data) => {
        const noteId = data[0].name;
        const requestConfig = JSON.parse(data[1]);
        const newNote = new Note(
          noteId,
          requestConfig.date,
          requestConfig.category,
          requestConfig.title,
          requestConfig.description,
        );
        dispatch(createNote(tripId, newNote));
      })
      .catch(() => {
        throw new Error('Cannot create a note!');
      });
  };
};
