import axios from 'axios';
import { FIREBASE_URL } from 'react-native-config';

import NoteModel from 'models/Note';

export const SET_NOTES = 'SET_NOTES';
export const CREATE_NOTE = 'CREATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';

const API_URL = FIREBASE_URL;

export const setNotes = (tripId: string, notes) => {
  return {
    notes,
    tripId,
    type: SET_NOTES,
  };
};

export const createNote = (tripId: string, newNote) => {
  return {
    newNote,
    tripId,
    type: CREATE_NOTE,
  };
};

export const deleteNote = (tripId: string, noteId: string) => {
  return {
    noteId,
    tripId,
    type: DELETE_NOTE,
  };
};

export const editNote = (tripId: string, updatedNote, noteId: string) => {
  return {
    noteId,
    tripId,
    type: EDIT_NOTE,
    updatedNote,
  };
};

export const fetchNotesRequest = (tripId: string) => {
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
            NoteModel({
              category: notes[key].category,
              date: notes[key].date,
              description: notes[key].description,
              id: key,
              title: notes[key].title,
            }),
          );
        }

        dispatch(setNotes(tripId, loadedNotes));
      })
      .catch(() => {
        throw new Error('Something went wrong while getting your notes!');
      });
  };
};

export const deleteNoteRequest = (tripId: string, noteId: string) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    axios
      .delete(
        `${API_URL}/Trips/${userId}/${tripId}/notes/${noteId}.json?auth=${token}`,
      )
      .then(() => {
        dispatch(deleteNote(tripId, noteId));
      })
      .catch(() => {
        throw new Error("Couldn't delete the note. Are you sure it exists?");
      });
  };
};

export const createNoteRequest = (
  tripId: string,
  category: string,
  title: string,
  description: string,
) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();

    axios
      .post(`${API_URL}/Trips/${userId}/${tripId}/notes.json?auth=${token}`, {
        category,
        date,
        description,
        title,
      })
      .then((res) => [res.data, unescape(res.config.data)])
      .then((data) => {
        const noteId = data[0].name;
        const requestConfig = JSON.parse(data[1]);
        const newNote = NoteModel({
          category: requestConfig.category,
          date: requestConfig.date,
          description: requestConfig.description,
          id: noteId,
          title: requestConfig.title,
        });
        dispatch(createNote(tripId, newNote));
      })
      .catch(() => {
        throw new Error('Cannot create a note!');
      });
  };
};

export const editNoteRequest = (
  tripId: string,
  noteId: string,
  title: string,
  category: string,
  description: string,
) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();

    axios
      .put(
        `${API_URL}/Trips/${userId}/${tripId}/notes/${noteId}.json?auth=${token}`,
        {
          category,
          date,
          description,
          noteId,
          title,
        },
      )
      .then(() => {
        const updatedNote = NoteModel({
          category,
          date,
          description,
          id: noteId,
          title,
        });

        dispatch(editNote(tripId, updatedNote, noteId));
      })

      .catch(() => {
        throw new Error("Couldn't edit note");
      });
  };
};
