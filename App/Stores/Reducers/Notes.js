import TRIPS from '../../Data/DummyData';
import {CREATE_NOTE, DELETE_NOTE} from '../Actions/Note';
import Note from '../../Models/NotesModel';
import { tripId } from '../../Screens/Notes/AddNoteScreen'

const initialState = {
  availableNotes: TRIPS
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NOTE:
      const newNote = new Note(
        new Date().toString(), //DUMMY ID
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
