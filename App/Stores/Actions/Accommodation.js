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
  return {
    type: CREATE_RESERVATION,
    tripId,
    reservationData: {
      name,
      address,
      reservationDetails,
    },
  };
};
