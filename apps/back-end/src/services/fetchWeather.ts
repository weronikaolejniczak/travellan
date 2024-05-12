import request from 'request-promise';

import createWeather from '../models/Weather';

const fetchWeather = (latitude: string, longitude: string) => {
  return request({
    method: 'GET',
    uri: encodeURI(
      `http:api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={hourly,current,minutely}&APPID=${process.env.WEATHER_API_KEY}&units=metric`,
    ),
    json: true,
  })
    .then((data) => {
      console.log(data);
      const timezone = {
        timezone: data.timezone,
        offset: data.timezone_offset,
      };
      const forecast: ReturnType<typeof createWeather>[] = [];

      data.daily.map((day) =>
        forecast.push(
          createWeather({
            date: new Date(day.dt * 1000),
            sunrise: new Date(day.sunrise * 1000),
            sunset: new Date(day.sunset * 1000),
            maxTemp: day.temp.max,
            minTemp: day.temp.min,
            tempDay: day.temp.day,
            tempNight: day.temp.night,
            tempDayFeelsLike: day.feels_like.day,
            tempNightFeelsLike: day.feels_like.night,
            pressure: day.pressure,
            humidity: day.humidity,
            windSpeed: day.wind_speed,
            cloudiness: day.clouds,
            description: day.weather[0].description,
            rain: day.pop,
            icon: day.weather[0].icon,
            main: day.weather[0].main,
          }),
        ),
      );

      return [forecast, timezone];
    })
    .catch((error) => error);
};

export default fetchWeather;
