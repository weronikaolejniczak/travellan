/* models */
import Map from 'map/models/Map';
/* actions */
export const FETCH_MAP = 'FETCH_MAP';
export const UPDATE_MAP = 'UPDATE_MAP';

/* fetch map - places and routes */
export const fetchMap = (tripId) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://travellan-project.firebaseio.com/Trips/${userId}/${tripId}.json?auth=${token}`,
    );
    // await json body of response
    const resData = await response.json();
    // take map stored in the trip and assign it to local variable for later logic
    let map = resData.map;
    dispatch({type: FETCH_MAP, tripId, map});
  };
};

/* update markers, routes and region in map */
export const updateMap = (tripId, markers, routes, region) => {
  return async function (dispatch, getState) {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://travellan-project.firebaseio.com/Trips/${userId}/${tripId}.json?auth=${token}`,
    );
    // await json body of response
    const resData = await response.json();
    // take map stored in the trip and assign it to local variable for later logic
    let map = resData.map;
    // create a new map instance with updated markers, routes and region
    let newMap = new Map(markers, routes, region);
    // update map
    map = newMap;
    dispatch({type: UPDATE_MAP, tripId, map});
  };
};
