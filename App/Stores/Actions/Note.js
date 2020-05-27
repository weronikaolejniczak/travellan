import Note from '../../Models/NotesModel'

export const DELETE_NOTE = 'DELETE_NOTE';
export const CREATE_NOTE = 'CREATE_NOTE';


export const deleteNote = (tripId, noteId) => {
  return async function (dispatch) {
    const response = await fetch(
      `https://travellan-project.firebaseio.com/Trips/${tripId}.json`,
    );

    // await json body of response
    const resData = await response.json();

    // take accommodationInfo stored in the trip and assign it to local variable for later logic
    let notes = resData.notes.filter( note => note.id !== noteId);


    // change accommodationInfo to exclude the reservation we want to delete
    // with the help of reservationId

    // PATCH updates some of the keys for a defined path without replacing all of the data
    await fetch(
      `https://travellan-project.firebaseio.com/Trips/${tripId}.json`,
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

    dispatch({type: DELETE_NOTE, parentId: tripId, pid: noteId, notes});
  };
};



/** 'create a reservation' action based on user input */
export const createNote = (
  tripId,
  title,
  description,

) => {
  const newNote = new Note(
    new Date().toString(), // DUMMY ID
    title,
    description,
  );

  return async function (dispatch) {
    const response = await fetch(
      `https://travellan-project.firebaseio.com/Trips/${tripId}.json`,
    );

    // await json body of response
    const resData = await response.json();

    // take accommodationInfo stored in the trip and assign it to local variable for later logic
    let notes = resData.notes;

    notes === undefined
      ? (notes = [newNote])
      : (notes = notes.concat(newNote));

    // PATCH updates some of the keys for a defined path without replacing all of the data
    await fetch(
      `https://travellan-project.firebaseio.com/Trips/${tripId}.json`,
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
