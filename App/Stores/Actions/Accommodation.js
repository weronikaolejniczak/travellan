import Accommodation from '../../Models/AccommodationModel';

export const DELETE_RESERVATION = 'DELETE_RESERVATION';
export const CREATE_RESERVATION = 'CREATE_RESERVATION';

/** 'delete a reservation' action based on id of reservation */
export const deleteReservation = (tripId, reservationId) => {
  return {type: DELETE_RESERVATION, parentId: tripId, pid: reservationId};
};

/** 'create a reservation' action based on user input */
export const createReservation = (
  tripId,
  name,
  address,
  reservationDetails,
) => {
  console.log(`2. action dispatched for ${tripId}`);

  const newReservation = new Accommodation(
    new Date().toString(), // DUMMY ID
    name,
    address,
    // DUMMY DATA
    {},
    '',
    'Description',
    reservationDetails,
  );

  // PATCH updates some of the keys for a defined path without replacing all of the data
  return async function (dispatch) {
    const trip = await fetch(
      `https://travellan-project.firebaseio.com/Trips/${tripId}.json`,
    );

    let accommodationInfo = trip.accommodationInfo;
    console.log(accommodationInfo);

    accommodationInfo === undefined
      ? (accommodationInfo = [newReservation])
      : (accommodationInfo = accommodationInfo.concat(newReservation));

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
