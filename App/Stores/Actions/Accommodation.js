import Accommodation from '../../Models/AccommodationModel';

export const DELETE_RESERVATION = 'DELETE_RESERVATION';
export const CREATE_RESERVATION = 'CREATE_RESERVATION';

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
    console.log('\naccommodation before deleting:\n');
    console.log(accommodationInfo);

    // change accommodationInfo to exclude the reservation we want to delete
    // with the help of reservationId
    /**
      let accommodation = [
        {id: 1, name: 'hello1'},
        {id: 2, name: 'hello2'},
        {id: 3, name: 'hello3'}
      ];
      const accommodationId = 1;

      let updatedAccomodation = accommodation
        .filter(item => !(item.id === accommodationId));

      console.log(updatedAccomodation);
     */
    accommodationInfo = accommodationInfo.filter(
      (item) => !(item.id === reservationId),
    );
    console.log('\naccommodation after deleting:\n');
    console.log(accommodationInfo);

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

    dispatch({type: DELETE_RESERVATION, tripId: tripId});
  };
};

/** 'create a reservation' action based on user input */
export const createReservation = (
  tripId,
  name,
  address,
  reservationDetails,
) => {
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
