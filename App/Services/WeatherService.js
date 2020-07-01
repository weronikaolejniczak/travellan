import axios from 'axios';

const client_id = '2df95b92e6ee09336448af058e8a05d8'; // only for development

/** fetch info from api.openweathermap.org */
export async function fetchWeather(latitude, longitude) {
  return await axios
    .get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hours&appid=${client_id}`,
    )
    .then((json) => json.data)
    .catch((err) => {
      console.log('error: ' + err.message);
    });
}
