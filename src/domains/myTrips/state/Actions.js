/* models */
import Trip from 'myTrips/models/Trip';
import Map from 'map/models/Map';
/* services */
import {fetchImage} from 'common/services/Image';
import {fetchCoords} from 'common/services/Coordinates';
/* actions */
export const FETCH_TRIPS = 'FETCH_TRIPS';
export const DELETE_TRIP = 'DELETE_TRIP';
export const CREATE_TRIP = 'CREATE_TRIP';

// fetch already existing/created trips from Firebase
export const fetchTrips = () => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://travellan-project.firebaseio.com/Trips/${userId}.json?auth=${token}`,
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      const loadedTrips = [];

      // adding trips from database one by one using the stored keys
      for (const key in data) {
        loadedTrips.push(
          new Trip(
            key,
            data[key].destination,
            data[key].region,
            data[key].image,
            data[key].startDate,
            data[key].endDate,
            data[key].budget,
            data[key].notes,
            data[key].transportInfo,
            data[key].accommodationInfo,
            data[key].map,
          ),
        );
      }
      dispatch({type: FETCH_TRIPS, trips: loadedTrips});
    } catch (error) {
      throw error;
    }
  };
};

// delete a trip based in tripId
export const deleteTrip = (tripId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    await fetch(
      `https://travellan-project.firebaseio.com/Trips/${userId}/${tripId}.json?auth=${token}`,
      {
        method: 'DELETE',
      },
    );
    dispatch({type: DELETE_TRIP, tripId});
  };
};

// create a trip based on user input
export const createTrip = (destination, startDate, endDate, budget) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    let image = await fetchImage(destination);
    let location = await fetchCoords(destination);
    let region = {
      latitude: location.lat,
      longitude: location.lon,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    let notes = [];
    let transportInfo = [];
    let accommodationInfo = [];
    let map = new Map([], [], null);
    // POST request to the database
    const response = await fetch(
      `https://travellan-project.firebaseio.com/Trips/${userId}.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination,
          region,
          image,
          startDate,
          endDate,
          budget,
          notes,
          transportInfo,
          accommodationInfo,
          map,
        }),
      },
    ); //.then(response => {    <- declares what happens after getting a response
    //...
    //}).catch(); <- listening to errors
    const data = await response.json();
    dispatch({
      type: CREATE_TRIP,
      tripData: {
        id: data.name,
        destination,
        region,
        image,
        startDate,
        endDate,
        budget,
        notes,
        transportInfo,
        accommodationInfo,
        map,
      },
    });
  };
};
