import axios from 'axios';
import { LOCATION_IQ_API_KEY } from 'react-native-dotenv';

async function autocompleteCity(query) {
  return await axios
    .get(
      `https://api.locationiq.com/v1/autocomplete.php?key=${LOCATION_IQ_API_KEY}&q=${query}&tag=place:*&limit=5&dedupe=1`,
    )
    .then((json) => json.data)
    .catch((error) => {
      return [];
    });
}

export default autocompleteCity;
