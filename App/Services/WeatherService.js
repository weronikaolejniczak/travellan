import axios from 'axios';

const client_id = '2df95b92e6ee09336448af058e8a05d8'; // only for development

/** fetch info from api.openweathermap.org */
export async function fetchWeather(latitude, longitude) {
  return await axios
    .get(
      `api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${client_id}`,
    )
    .then((json) => console.log(json.data))
    .catch(() => {
      console.log('error');
    });
}

// successful request returns a response in which 'list' attribute contains
// weather information for upcoming 5 days:
// - temperature in Kelvin (have to convert to Celsius),
// - 'feels like' temperature in Kelvin,
// - humidity,
// - "weather" attribute: list of objects -> "id", "main", "description",
// - "clouds" attribute,
// - "wind" attribute: "speed" and "deg",
// - "dt_txt" attribute: "2020-05-31 03:00:00" (split into two parts).

// if "dt_txt" converted to our date format is within the trip period,
// include it in the output
// for each such date add an object with:
// "city"
// "country"
// "coord": "lat", "lon"
// "timezone"
// "sunrise" and "sunset"
// "hour": "03:00:00""
// "temp_celsius"
// "felt_temp_celsius"
// "humidity"
// "weather": "main", "description"
// "clouds"
// "wind"
