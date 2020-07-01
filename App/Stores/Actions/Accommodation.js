import Accommodation from '../../Models/AccommodationModel';

export const SET_RESERVATIONS = 'SET_RESERVATIONS';
export const DELETE_RESERVATION = 'DELETE_RESERVATION';
export const CREATE_RESERVATION = 'CREATE_RESERVATION';

/** 'fetch reservations' action based on id of trip */
export const fetchReservations = (tripId) => {
  return async function (dispatch) {
    const response = await fetch(
      `https://travellan-project.firebaseio.com/Trips/${tripId}.json`,
    );

    // await json body of response
    const resData = await response.json();

    // take accommodationInfo stored in the trip and assign it to local variable for later logic
    let accommodationInfo = resData.accommodationInfo;

    dispatch({type: SET_RESERVATIONS, tripId, accommodationInfo});
  };
};

/** 'delete a reservation' action based on id of reservation */
export const deleteReservation = (tripId, reservationId) => {
  return async function (dispatch) {
    const response = await fetch(
      `https://travellan-project.firebaseio.com/Trips/${tripId}.json`,
    );

    // await json body of response
    const resData = await response.json();

    // take accommodationInfo stored in the trip and assign it to local variable for later logic
    let accommodationInfo = resData.accommodationInfo;

    // change accommodationInfo to exclude the reservation we want to delete
    // with the help of reservationId
    accommodationInfo = accommodationInfo.filter(
      (item) => !(item.id === reservationId),
    );

    // PATCH updates some of the keys for a defined path without replacing all of the data
    await fetch(
      `https://travellan-project.firebaseio.com/Trips/${tripId}.json`,
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

    dispatch({type: DELETE_RESERVATION, tripId});
  };
};

/** 'create a reservation' action based on user input */
export const createReservation = (
  tripId,
  name,
  address,
  description,
  reservationDetails,
) => {
  const newReservation = new Accommodation(
    new Date().toString(), // DUMMY ID
    name,
    address,
    // DUMMY DATA
    {},
    '',
    description,
    reservationDetails,
  );

  return async function (dispatch) {
    const response = await fetch(
      `https://travellan-project.firebaseio.com/Trips/${tripId}.json`,
    );

    // await json body of response
    const resData = await response.json();

    // take accommodationInfo stored in the trip and assign it to local variable for later logic
    let accommodationInfo = resData.accommodationInfo;

    accommodationInfo === undefined
      ? (accommodationInfo = [newReservation])
      : (accommodationInfo = accommodationInfo.concat(newReservation));

    // PATCH updates some of the keys for a defined path without replacing all of the data
    await fetch(
      `https://travellan-project.firebaseio.com/Trips/${tripId}.json`,
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

    dispatch({
      type: CREATE_RESERVATION,
      tripId,
      accommodationInfo,
    });
  };
};
