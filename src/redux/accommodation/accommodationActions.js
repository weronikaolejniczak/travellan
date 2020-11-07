/* NOTE: accommodation and reservation is used interchangeably in the comments */
import Accommodation from 'accommodation/models/Accommodation';

export const SET_RESERVATIONS = 'SET_RESERVATIONS';
export const DELETE_RESERVATION = 'DELETE_RESERVATION';
export const CREATE_RESERVATION = 'CREATE_RESERVATION';

// Fetch reservations based on trip id.
export const fetchReservations = (tripId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://travellan-project.firebaseio.com/Trips/${userId}/${tripId}.json?auth=${token}`,
    );
    // Await json body of response.
    const resData = await response.json();
    // Take accommodationInfo stored in the trip and assign it to local variable for later logic.
    let accommodationInfo = resData.accommodationInfo;
    // Dispatch an action to reducer.
    dispatch({type: SET_RESERVATIONS, tripId, accommodationInfo});
  };
};

// Delete a accommodation based on id of reservation.
export const deleteReservation = (tripId, reservationId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://travellan-project.firebaseio.com/Trips/${userId}/${tripId}.json?auth=${token}`,
    );
    // Await json body of response.
    const resData = await response.json();
    // Take accommodationInfo stored in the trip and assign it to local variable for later logic.
    let accommodationInfo = resData.accommodationInfo;
    // Change accommodationInfo to exclude the reservation we want to delete with the help of reservationId.
    accommodationInfo = accommodationInfo.filter(
      (item) => !(item.id === reservationId),
    );
    // PATCH updates some of the keys for a defined path without replacing all of the data.
    await fetch(
      `https://travellan-project.firebaseio.com/Trips/${userId}/${tripId}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accommodationInfo,
        }),
      },
    );
    // Dispatch an action to reducer.
    dispatch({type: DELETE_RESERVATION, tripId});
  };
};

// Create a reservation based on user input.
export const createReservation = (
  tripId,
  name,
  address,
  facilities,
  hotelHours,
  description,
  reservationDetails,
) => {
  const newReservation = new Accommodation(
    new Date().toString(), // DUMMY ID
    name,
    address,
    facilities,
    hotelHours,
    {},
    '',
    description,
    reservationDetails,
  );

  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://travellan-project.firebaseio.com/Trips/${userId}/${tripId}.json?auth=${token}`,
    );
    // Await json body of response.
    const resData = await response.json();
    // Take accommodationInfo stored in the trip and assign it to local variable for later logic.
    let accommodationInfo = resData.accommodationInfo;
    // If there is no accommodation, create an array with newReservation as the only element, else add a newReservation to the existing array.
    accommodationInfo === undefined
      ? (accommodationInfo = [newReservation])
      : (accommodationInfo = accommodationInfo.concat(newReservation));
    // PATCH updates some of the keys for a defined path without replacing all of the data.
    await fetch(
      `https://travellan-project.firebaseio.com/Trips/${userId}/${tripId}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accommodationInfo,
        }),
      },
    );
    // Dispatch an action to reducer.
    dispatch({
      type: CREATE_RESERVATION,
      tripId,
      accommodationInfo,
    });
  };
};
