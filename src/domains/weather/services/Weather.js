import axios from 'axios';
import Weather from 'weather/model/Weather';
import {WEATHER_ID} from 'react-native-dotenv';

const client_id = WEATHER_ID;

// fetch info from api.openweathermap.org
export async function fetchWeather(latitude, longitude) {
  return await axios
    .get(
      `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={hourly,current,minutely}&APPID=${client_id}&units=metric`,
    )
    .then((res) => res.data)
    .then((data) => {
      // timezone_offset, timezone
      let timezone = {
        timezone: data.timezone,
        offset: data.timezone_offset,
      };
      let forecast = [];
      // add each day weather forecast to an array
      data.daily.map((day) =>
        forecast.push(
          new Weather(
            new Date(day.dt * 1000),
            new Date(day.sunrise * 1000),
            new Date(day.sunset * 1000),
            day.temp.max, // celsius
            day.temp.min, // celsius
            day.temp.day, // celsius
            day.temp.night, // celsius
            day.feels_like.day, // celsius
            day.feels_like.night, // celsius
            day.pressure, // hPa
            day.humidity, // %
            day.wind_speed, // m/s
            day.clouds, //  %
            day.weather[0].description, // string
            day.pop, // propability
            day.weather[0].icon, // icon id
            day.weather[0].main,
          ),
        ),
      );
      //console.log('FORECAST IN FETCH WEATHER FUNCTION: ');
      //console.log(forecast);
      return [forecast, timezone];
    })
    .catch((error) => console.log(error));
}
