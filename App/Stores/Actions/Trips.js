/** MODELS */
import Trip from '../../Models/TripModel';
/** SERVICES */
import {fetchImage} from '../../Services/ImageService';
import {fetchCoords} from '../../Services/CoordinatesService';
/** ACTIONS */
export const DELETE_TRIP = 'DELETE_TRIP';
export const CREATE_TRIP = 'CREATE_TRIP';
export const SET_TRIPS = 'SET_TRIPS';

// fetch already existing/created trips from Firebase
export const fetchTrips = () => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    // GET request to the database (default mode of fetch)
    const response = await fetch(
      `https://travellan-project.firebaseio.com/Trips/${userId}.json?auth=${token}`,
    ); //.then(response => {    <- declares what happens after getting a response
    //...
    //}).catch(); <- listening to errors
    const resData = await response.json();
    const loadedTrips = [];

    // adding trips from database one by one using the stored keys
    for (const key in resData) {
      loadedTrips.push(
        new Trip(
          key,
          resData[key].destination,
          resData[key].region,
          resData[key].image,
          resData[key].startDate,
          resData[key].endDate,
          resData[key].budget,
          resData[key].notes,
          resData[key].transportInfo,
          resData[key].accommodationInfo,
          resData[key].pointsOfInterest,
        ),
      );
    }
    dispatch({type: SET_TRIPS, trips: loadedTrips});
  };
};

/** 'delete a trip' action based in tripId */
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

    dispatch({type: DELETE_TRIP, pid: tripId});
  };
};

/** 'create a trip' action based on user input */
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
    let pointsOfInterest = [];

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
          pointsOfInterest,
        }),
      },
    ); //.then(response => {    <- declares what happens after getting a response
    //...
    //}).catch(); <- listening to errors

    const resData = await response.json();
    //console.log(resData);

    dispatch({
      type: CREATE_TRIP,
      tripData: {
        id: resData.name,
        destination,
        region,
        image,
        startDate,
        endDate,
        budget,
        notes,
        transportInfo,
        accommodationInfo,
        pointsOfInterest,
      },
    });
  };
};
