interface WeatherParams {
  cloudiness: number;
  date: Date;
  description: string;
  humidity: number;
  icon: string;
  main: string;
  maxTemp: number;
  minTemp: number;
  pressure: number;
  rain: number;
  sunrise: Date;
  sunset: Date;
  tempDay: number;
  tempDayFeelsLike: number;
  tempNight: number;
  tempNightFeelsLike: number;
  windSpeed: number;
}

const Weather = ({
  cloudiness,
  date,
  description,
  humidity,
  icon,
  main,
  maxTemp,
  minTemp,
  pressure,
  rain,
  sunrise,
  sunset,
  tempDay,
  tempDayFeelsLike,
  tempNight,
  tempNightFeelsLike,
  windSpeed,
}: WeatherParams) => ({
  cloudiness,
  date,
  description,
  humidity,
  icon,
  main,
  maxTemp,
  minTemp,
  pressure,
  rain,
  sunrise,
  sunset,
  tempDay,
  tempDayFeelsLike,
  tempNight,
  tempNightFeelsLike,
  windSpeed,
});

export default Weather;
