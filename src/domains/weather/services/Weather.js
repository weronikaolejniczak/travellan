import axios from 'axios';
import {WEATHER_ID} from 'react-native-dotenv';

const client_id = WEATHER_ID;

// Fetch info from api.openweathermap.org.
export async function fetchWeather(latitude, longitude) {
  return await axios
    .get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hours&appid=${client_id}`,
    )
    .then((json) => json.data);
}
