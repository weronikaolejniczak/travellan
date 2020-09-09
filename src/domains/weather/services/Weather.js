import axios from 'axios';
import Weather from 'weather/model/Weather';
import {WEATHER_ID} from 'react-native-dotenv';

const client_id = WEATHER_ID;

// fetch info from api.openweathermap.org
export async function fetchWeather(latitude, longitude) {
  return await axios
    .get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={hourly,current,minutely}&APPID=${client_id}&units=metric`,
    )
    .then((data) => data.json())
    .then((results) => {
      console.log(results);
      const forecast = [];

      results.map((day) =>
        forecast.push(
          new Weather(
            new Date(day.daily[forecast.length].dt * 1000),
            new Date(day.daily[forecast.length].sunrise * 1000),
            new Date(day.daily[forecast.length].sunset * 1000),
            day.daily[forecast.length].temp.max, // celsius
            day.daily[forecast.length].temp.min, // celsius
            day.daily[forecast.length].temp.day, // celsius
            day.daily[forecast.length].temp.night, // celsius
            day.daily[forecast.length].feels_like.day, // celsius
            day.daily[forecast.length].feels_like.night, // celsius
            day.daily[forecast.length].pressure, // hPa
            day.daily[forecast.length].humidity, // %
            day.daily[forecast.length].wind_speed, // m/s
            day.daily[forecast.length].clouds, //  %
            day.daily[forecast.length].weather[0].description, // string
            day.daily[forecast.length].pop, // propability
            day.daily[forecast.length].weather[0].icon, // icon id
            day.daily[forecast.length].weather[0].main,
          ),
        ),
      );

      console.log(forecast);
      return forecast;
    });
}
