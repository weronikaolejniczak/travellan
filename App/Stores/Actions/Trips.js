export const DELETE_TRIP = 'DELETE_TRIP';
export const CREATE_TRIP = 'CREATE_TRIP';

export const deleteTrip = (tripId) => {
  return {type: DELETE_TRIP, pid: tripId};
};

export const createTrip = (destination, startDate, endDate, budget) => {
  return {
    type: CREATE_TRIP,
    tripData: {
      destination,
      startDate,
      endDate,
      budget,
    },
  };
};
