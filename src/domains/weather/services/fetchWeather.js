import axios from 'axios';
import Weather from 'weather/model/Weather';
import {WEATHER_API} from 'react-native-dotenv';

const API_KEY = WEATHER_API;

export async function fetchWeather(latitude, longitude) {
  return await axios
    .get(
      `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={hourly,current,minutely}&APPID=${API_KEY}&units=metric`,
    )
    .then((res) => res.data)
    .then((data) => {
      let timezone = {
        timezone: data.timezone,
        offset: data.timezone_offset,
      };
      let forecast = [];
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
            day.pop, // probability
            day.weather[0].icon, // icon id
            day.weather[0].main,
          ),
        ),
      );

      return [forecast, timezone];
    })
    .catch((error) => error);
}
