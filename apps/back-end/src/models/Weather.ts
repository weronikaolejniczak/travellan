interface WeatherParams {
  date: Date;
  sunrise: Date;
  sunset: Date;
  maxTemp: number;
  minTemp: number;
  tempDay: number;
  tempNight: number;
  tempDayFeelsLike: number;
  tempNightFeelsLike: number;
  pressure: number;
  humidity: number;
  windSpeed: number;
  cloudiness: number;
  description: string;
  rain?: number;
  icon: string;
  main: string;
}

function createWeather({
  date,
  sunrise,
  sunset,
  maxTemp, // celsius
  minTemp, // celsius
  tempDay, // celsius
  tempNight, // celsius
  tempDayFeelsLike, // celsius
  tempNightFeelsLike, // celsius
  pressure, // hPa
  humidity, // %
  windSpeed, // m/s
  cloudiness, // %
  description, // string
  rain, // probability
  icon, // icon id
  main,
}: WeatherParams) {
  return {
    date,
    sunrise,
    sunset,
    maxTemp,
    minTemp,
    tempDay,
    tempNight,
    tempDayFeelsLike,
    tempNightFeelsLike,
    pressure,
    humidity,
    windSpeed,
    cloudiness,
    description,
    rain: rain ?? 0,
    icon,
    main,
  };
}

export default createWeather;
