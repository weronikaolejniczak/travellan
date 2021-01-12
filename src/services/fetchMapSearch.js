import axios from 'axios';
import { MAPBOX_API_KEY } from 'react-native-dotenv';

const API_KEY = MAPBOX_API_KEY;

async function fetchMapSearch(query, longitude, latitude) {
  return await axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?limit=1&proximity=${longitude},${latitude}&access_token=${API_KEY}`,
    )
    .then((json) => json.data.features[0]);
}

export default fetchMapSearch;
