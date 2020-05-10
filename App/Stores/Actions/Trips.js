import {fetchImage} from '../../Services/ImageService';

/**
 * 'delete a trip' action based in tripId
 */
export const DELETE_TRIP = 'DELETE_TRIP';
export const deleteTrip = (tripId) => {
  return {type: DELETE_TRIP, pid: tripId};
};

/**
 * 'create a trip' action based on user input
 */
export const CREATE_TRIP = 'CREATE_TRIP';
export const createTrip = (destination, startDate, endDate, budget) => {
  return async function (dispatch) {
    let imageUrl = await fetchImage(destination);
    imageUrl = imageUrl.toString();

    dispatch({
      type: CREATE_TRIP,
      tripData: {
        destination,
        imageUrl, // UNEXPECTED: saves into imageUrl the value of startDate, EXPECTED: saves into imageUrl the value of fetched data stored in url
        startDate,
        endDate,
        budget,
      },
    });
  };
};
