import NOTES from '../../Data/DummyNote';
import {CREATE_NOTE, DELETE_NOTE} from '../Actions/Note';
import Note from '../../Models/NotesModel';

const initialState = {
  availableNotes: NOTES,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NOTE:
      const newNote = new Note(
        action.noteData.title,
        action.noteData.description,
      );
      return {
        ...state,
        availableNotes: state.availableNotes.concat(newNote),
      };
      case DELETE_NOTE:
        return {
          ...state,
          availableNotes: state.availableNotes.filter(
            (note) => note.title !== action.pid,
          ),
        };
    }
  return state;
};
