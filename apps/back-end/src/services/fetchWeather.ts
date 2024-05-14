import fetch from 'node-fetch';
import createWeather from '../models/Weather';

interface WeatherDay {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: {
    max: number;
    min: number;
    day: number;
    night: number;
  };
  feels_like: {
    day: number;
    night: number;
  };
  pressure: number;
  humidity: number;
  wind_speed: number;
  clouds: number;
  weather: {
    description: string;
    icon: string;
    main: string;
  }[];
  pop: number;
}

interface WeatherAPIResponse {
  timezone: string;
  timezone_offset: number;
  daily: WeatherDay[];
}

const fetchWeather = async (
  latitude: string,
  longitude: string,
): Promise<
  [ReturnType<typeof createWeather>[], { timezone: string; offset: number }]
> => {
  const uri = encodeURI(
    `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,current,minutely&APPID=${process.env.WEATHER_API_KEY}&units=metric`,
  );

  try {
    const response = await fetch(uri);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = (await response.json()) as WeatherAPIResponse;

    const timezone = {
      timezone: data.timezone,
      offset: data.timezone_offset,
    };

    const forecast: ReturnType<typeof createWeather>[] = data.daily.map((day) =>
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
        description: day.weather[0]?.description,
        rain: day.pop,
        icon: day.weather[0]?.icon,
        main: day.weather[0]?.main,
      }),
    );

    return [forecast, timezone];
  } catch (error) {
    console.error('Fetch failed: ', error);
    throw error;
  }
};

export default fetchWeather;
