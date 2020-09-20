/* models */
import Map from 'map/models/Map';
import PointOfInterest from 'map/models/PointOfInterest';
/* actions */
export const FETCH_MAP = 'FETCH_MAP';
export const CREATE_POI = 'CREATE_POI';

/** fetch map - places and routes */
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
    console.log(map);
    dispatch({type: FETCH_MAP, tripId, map});
  };
};

/* create a point of interest based on map input */
export const createPoI = (tripId, lat, lon, title) => {
  const newPoI = new PointOfInterest(new Date().toString(), lat, lon, title);

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
    // take points of interest in map stored in the trip and assign it to local variable for later logic
    /* let pointsOfInterest =
      currentMap.pointsOfInterest === undefined
        ? (pointsOfInterest = [newPoI])
        : (pointsOfInterest = pointsOfInterest.concat(newPoI)); */
    // create a new map instance with updated points of interest array
    map =
      map === undefined
        ? new Map([newPoI], [])
        : new Map([...map.pointsOfInterest, newPoI]);
    // PATCH updates some of the keys for a defined path without replacing all of the data
    await fetch(
      `https://travellan-project.firebaseio.com/Trips/${userId}/${tripId}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          map,
        }),
      },
    );
    dispatch({
      type: CREATE_POI,
      tripId,
      map,
    });
  };
};
