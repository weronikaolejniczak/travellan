import axios from 'axios';
import { MAPBOX_KEY } from 'react-native-dotenv';

const API_KEY = MAPBOX_KEY;

async function fetchMapSearch(querry, longitude, latitude) {
  return await axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${querry}.json?limit=1&proximity=${longitude},${latitude}&access_token=${API_KEY}`,
    )
    .then((json) => json.data);
}

export default fetchMapSearch;
