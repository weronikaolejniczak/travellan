import Accommodation from 'accommodation/models/Accommodation';

import {
  FETCH_ACCOMMODATION,
  DELETE_ACCOMMODATION,
  CREATE_ACCOMMODATION,
} from './accommodationTypes';

export const fetchAccommodation = (tripId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://travellan-project.firebaseio.com/Trips/${userId}/${tripId}.json?auth=${token}`,
    );
    const resData = await response.json();
    const accommodation = resData.accommodation;
    dispatch({type: FETCH_ACCOMMODATION, tripId, accommodation});
  };
};

export const deleteAccommodation = (tripId, id) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://travellan-project.firebaseio.com/Trips/${userId}/${tripId}.json?auth=${token}`,
    );
    const resData = await response.json();
    let accommodation = resData.accommodation;
    accommodation = accommodation.filter((item) => !(item.id === id));
    // PATCH updates some of the keys for a defined path without replacing all of the data
    await fetch(
      `https://travellan-project.firebaseio.com/Trips/${userId}/${tripId}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accommodation,
        }),
      },
    );
    dispatch({type: DELETE_ACCOMMODATION, tripId, accommodation});
  };
};

/* CHANGE!!!!! */
export const createAccommodation = (
  tripId,
  name,
  address,
  ammenities,
  hotelHours,
  description,
  details,
) => {
  const newAccommodation = new Accommodation(
    new Date().toString(), // DUMMY ID
    name,
    address,
    ammenities,
    hotelHours,
    {},
    '',
    description,
    details,
  );

  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://travellan-project.firebaseio.com/Trips/${userId}/${tripId}.json?auth=${token}`,
    );
    const resData = await response.json();
    let accommodation = resData.accommodation;
    // if there is no accommodation, create an array with newAccommodation as the only element, else add a newAccommodation to the existing array.
    accommodation === undefined
      ? (accommodation = [newAccommodation])
      : (accommodation = accommodation.concat(newAccommodation));
    // PATCH updates some of the keys for a defined path without replacing all of the data
    await fetch(
      `https://travellan-project.firebaseio.com/Trips/${userId}/${tripId}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accommodation,
        }),
      },
    );
    dispatch({
      type: CREATE_ACCOMMODATION,
      tripId,
      accommodation,
    });
  };
};
