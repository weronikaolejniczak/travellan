import axios from 'axios';
import { TOM_TOM_API } from 'react-native-dotenv';

const API_KEY = TOM_TOM_API;

async function fetchCoordinates(keyword) {
  return await axios
    .get(
      `https://api.tomtom.com/search/2/geocode/${keyword}.json?key=${API_KEY}`,
    )
    .then((json) => json.data.results[0].position);
}

export default fetchCoordinates;
