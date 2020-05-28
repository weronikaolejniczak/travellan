import axios from 'axios';
//import Geocoder from 'react-native-geocoding';

const api_key = 'nJ8ndusGuFZvpbaLoxrqJdLJEfeAMJkN';
/*const placeholderCoords = {
    latitude = 0.0,
    longitude = 0.0
};
*/

export async function fetchCoords(keyword) {
  return await axios
    .get(
      `https://api.tomtom.com/search/2/geocode/${keyword}.json?key=${api_key}`,
    )
    .then(json => 
         json.data.results[0].position)
        //var latitude = location.lat;
        //var longitutude = location.lon;
    //.catch((onrejected) => placeholderCoords);
}
//if sometime in the future you'd like to get city_name by latitude and longitude use this:
//https://api.opencagedata.com/geocode/v1/json?q=LAT+LNG&key=YOUR-API-KEY


/*export async function fetchCoordinates(keyword) {
    return await axios
        .get(
            `https://api.opencagedata.com/geocode/v1/json?q=${keyword}&key=${client_id}`
            )
          .then((json) => json.data.results[0].annotations.DMS.lat);
          .catch((onrejected) => placeholderCoords);


};
*/