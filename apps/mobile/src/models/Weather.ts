interface WeatherModelParams {
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

const WeatherModel = ({
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
}: WeatherModelParams) => ({
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

export default WeatherModel;
