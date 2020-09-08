import axios from 'axios';
import {LOCATION_IQ} from 'react-native-dotenv';

const api_key = LOCATION_IQ;

// https://eu1.locationiq.com/v1/search.php?key=YOUR_PRIVATE_TOKEN&q=SEARCH_STRING&format=json

export async function fetchCoords(query) {
  return await axios
    .get(
      `https://eu1.locationiq.com/v1/search.php?key=${api_key}&q=${query}&format=json`,
    )
    .then((json) => console.log(json));
}

/* for query 'srodka 6'
- lat, lon
- display_name
[
    {
        "place_id": "53251570",
        "licence": "https://locationiq.com/attribution",
        "osm_type": "node",
        "osm_id": "4215254918",
        "boundingbox": [
            "52.410948",
            "52.411048",
            "16.953457",
            "16.953557"
        ],
        "lat": "52.410998",
        "lon": "16.953507",
        "display_name": "Hotel Śródka, 6, Śródka, Zawady, Śródka, Ostrów Tumski-Śródka-Zawady-Komandoria, Poznań, Greater Poland Voivodeship, 61-125, Poland",
        "class": "tourism",
        "type": "hotel",
        "importance": 0.11100000000000002,
        "icon": "https://locationiq.org/static/images/mapicons/accommodation_hotel2.p.20.png"
    },
*/
