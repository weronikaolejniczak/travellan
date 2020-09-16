import Note from 'notes/models/Note';

export const DELETE_NOTE = 'DELETE_NOTE';
export const CREATE_NOTE = 'CREATE_NOTE';
export const SET_NOTES = 'SET_NOTES';

export const fetchNotes = (tripId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://travellan-project.firebaseio.com/Trips/${userId}/${tripId}.json?auth=${token}`,
    );
    // Await json body of response.
    const resData = await response.json();
    // Take notes stored in the trip and assign it to local variable for later logic.
    let notes = resData.notes;
    dispatch({type: SET_NOTES, tripId, notes});
  };
};

export const deleteNote = (tripId, noteId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://travellan-project.firebaseio.com/Trips/${userId}/${tripId}.json?auth=${token}`,
    );
    // Await json body of response.
    const resData = await response.json();
    // Take notes stored in the trip and assign it to local variable for later logic.
    // Change notes to exclude the reservation we want to delete with the help of noteId.
    let notes = resData.notes.filter((note) => note.id !== noteId);
    // PATCH updates some of the keys for a defined path without replacing all of the data.
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
  };
};

// Create a reservation based on user input.
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
      `https://travellan-project.firebaseio.com/Trips/${userId}/${tripId}.json?auth=${token}`,
    );
    // Await json body of response.
    const resData = await response.json();
    // Take notes stored in the trip and assign it to local variable for later logic.
    let notes = resData.notes;
    notes === undefined ? (notes = [newNote]) : (notes = notes.concat(newNote));
    // PATCH updates some of the keys for a defined path without replacing all of the data.
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
  };
};
