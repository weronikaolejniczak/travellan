import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
/** imports from within the module */
import {WEATHER_ID} from 'react-native-dotenv';
import {fetchWeather} from 'weather/services/Weather.js';
import {weatherStyle as styles} from './WeatherStyle';

const client_id = WEATHER_ID;

/** weather representational component */
const Weather = (props) => {
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
  );
  const region = selectedTrip.region;
  const latitude = region.latitude;
  const longitude = region.longitude;

  // date operations
  var startDate = new Date(selectedTrip.startDate);
  var startDay = startDate.getDate();
  var startMonth = startDate.getMonth() + 1;
  var startYear = startDate.getFullYear();
  var convertedStartDate = startYear + '-' + startMonth + '-' + startDay;
  var convertedStartDate = new Date(convertedStartDate);
  var currentDate = new Date();

  const [differenceGuard, setDifferenceGuard] = useState(false); // guard for checking day difference between currentDate and startDate
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [forecast, setForecast] = useState();

  useEffect(() => {
    // fetch weather from OpenWeatherMap API using lat and lon values
    async function getWeather() {
      let weather = await fetchWeather(latitude, longitude);
      //console.log(weather);
      setForecast(weather);
    }
    setIsLoading(true);
    getWeather().then(() =>
      console.log('FORECAST IN WEATHER COMPONENT: ' + forecast),
    );
    checkDates();
    setIsLoading(false);
    setIsLoaded(true);
  }, []);

  // decide whether to display weather or not
  const checkDates = () => {
    if (startDate < currentDate) {
      // always show weather if currentDate is bigger then startDate
      setDifferenceGuard(true);
    } else {
      // if startDate is bigger then currentDate then calculate day difference
      const diffTime = Math.abs(startDate - currentDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays <= 7) {
        // if day difference is smaller then 7, show weather
        setDifferenceGuard(true);
      } else {
        // if day difference is bigger then 7, weather is unavailable
        setDifferenceGuard(false);
      }
    }
    console.log('DIFFERENCE GUARD VALUE: ' + differenceGuard);
    return differenceGuard;
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {isLoading && <ActivityIndicator />}
      {isLoaded && differenceGuard && (
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {/*SEVENTH DAY*/}
          {/* <Image
            style={{width: 70, height: 70}}
            source={{
              uri:
                'http://openweathermap.org/img/wn/' + forecast[6].icon + '.png',
            }}
          />
          <Text>Date: {forecast[6].date.toDateString()}</Text>
          <Text>Sunrise: {forecast[6].sunrise.toTimeString()}</Text>
          <Text>Sunset: {forecast[6].sunset.toTimeString()}</Text>
          <Text>Max Temperature: {forecast[6].maxTemp}°C</Text>
          <Text>Min Temperature: {forecast[6].minTemp}°C</Text>
          <Text>Day Temperature: {forecast[6].tempDay}°C</Text>
          <Text>Night Temperature: {forecast[6].tempNight}°C</Text>
          <Text>
            Feels like day temperature: {forecast[6].tempFeels_like_day}°C
          </Text>
          <Text>
            Feels like night temperature: {forecast[6].tempFeels_like_night}°C
          </Text>
          <Text>Pressure: {forecast[6].pressure}hPa</Text>
          <Text>Humidity: {forecast[6].humidity}%</Text>
          <Text>Wind Speed: {forecast[6].wind_speed}m/s</Text>
          <Text>Cloudiness: {forecast[6].cloudiness}%</Text>
          <Text>Description: {forecast[6].description}</Text>
          <Text>
            Propability of rain: {(forecast[6].rain * 100).toFixed(0)}%
          </Text>
          {/*<Text>Icon id: {forecast[6].icon}</Text>*/}
        </ScrollView>
      )}
      {isLoaded && !isLoading && (
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={[styles.text, styles.itemlessText]}>
            Weather forecast is not available for your trip!
          </Text>
          <TouchableOpacity
            onPress={() => {
              setDifferenceGuard(true);
            }}>
            <Text style={styles.text}>Check the forecast for next 7 days</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </ScrollView>
  );
};

export default Weather;
