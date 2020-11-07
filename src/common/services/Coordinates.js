import axios from 'axios';
import {COORDS_API} from 'react-native-dotenv';

const api_key = COORDS_API;

export async function fetchCoords(keyword) {
  return await axios
    .get(
      `https://api.tomtom.com/search/2/geocode/${keyword}.json?key=${api_key}`,
    )
    .then((json) => json.data.results[0].position);
}

// If sometime in the future you'd like to get city_name by latitude and longitude use this endpoint:
// https://api.opencagedata.com/geocode/v1/json?q=LAT+LNG&key=YOUR-API-KEY
// Function will look like this:
/* export async function fetchCoordinates(keyword) {
    return await axios
        .get(
            `https://api.opencagedata.com/geocode/v1/json?q=${keyword}&key=${client_id}`
            )
          .then((json) => json.data.results[0].annotations.DMS.lat);
          .catch((onrejected) => placeholderCoords);
};
*/
