import {fetchImage} from '../../Services/ImageService';
import Trip from '../../Models/TripModel';

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
    //Placeholders - delete as soon as real parts are ready
    let region ={
      latitude: 45.464203,
      longitude: 9.189982,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    let notes = [];
    let transportInfo = [];
    let accommodationInfo = [];
    let pointsOfInterest = [];
   
    
    //POST Request to the database:
    const response = await fetch('https://travellan-project.firebaseio.com/Trips.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        destination,
        region,
        imageUrl,
        startDate,
        endDate,
        budget,
        notes,
        transportInfo,
        accommodationInfo,
        pointsOfInterest,
      })
    });//.then(response => {    <- declares what happens after getting a response
      //...
    //}).catch(); <- listening to errors

/*copy
id,
    destination,
    region,
    imageUrl,
    startDate,
    endDate,
    budget,
    notes,
    transportInfo,
    accommodationInfo,
    pointsOfInterest,

*/

    const resData = await response.json();

    console.log(resData);
    
    dispatch({
      type: CREATE_TRIP,
      tripData: {
        id: resData.name,
        destination,
        region,
        imageUrl,
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

//Fetch already existing/created trips from Firebase

export const SET_TRIPS = 'SET_TRIPS';

export const fetchTrips = () => {
  return async function (dispatch) {
    //let imageUrl = await fetchImage(destination);
    //imageUrl = imageUrl.toString();

    //GET Request to the database (default mode of fetch)
    const response = await fetch('https://travellan-project.firebaseio.com/Trips.json'
      
    );//.then(response => {    <- declares what happens after getting a response
      //...
    //}).catch(); <- listening to errors
    const resData = await response.json();
    const loadedTrips = [];

      //adding trips from database one by one using the stored keys
      for (const key in resData){
        console.log(resData[key].imageUrl);
        //resData[key].imageUrl = resData[key].imageUrl.toString();
        loadedTrips.push(
          new Trip(
            key,
            resData[key].destination,
            resData[key].region,
            resData[key].imageUrl,
            resData[key].startDate,
            resData[key].endDate,
            resData[key].budget,
            resData[key].notes,
            resData[key].transportInfo,
            resData[key].accommodationInfo,
            resData[key].pointsOfInterest,
          )
        );
      }
    //console.log(resData);
    dispatch({type: SET_TRIPS, trips: loadedTrips})
  }
};
