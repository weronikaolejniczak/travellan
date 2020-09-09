import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
/** imports from within the module */
import {fetchWeather} from 'weather/services/Weather';
import {weatherStyle as styles} from './WeatherStyle';
import {WEATHER} from 'weather/data/DummyWeather';
import Colors from 'constants/Colors';

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
  var convertedStartDate = new Date(
    `${startDate.getFullYear()}'-'${
      startDate.getMonth() + 1
    }'-'${startDate.getDate()}`,
  );
  var currentDate = new Date();

  const [differenceGuard, setDifferenceGuard] = useState(false); // guard for checking day difference between currentDate and startDate
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [forecast, setForecast] = useState();
  const [timezone, setTimezone] = useState();

  useEffect(() => {
    // fetch weather from OpenWeatherMap API using lat and lon values
    async function getWeather() {
      //let result = await fetchWeather(latitude, longitude);
      //let weather = result[0];
      //let tmz = result[1];
      //console.log(weather);
      setForecast(WEATHER); // small caps 'weather'
      //setTimezone(tmz);
    }
    setIsLoading(true);
    checkDates();
    getWeather().then(() => {
      setIsLoading(false);
      setIsLoaded(true);
    });
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
    //console.log('DIFFERENCE GUARD VALUE: ' + differenceGuard);
    return differenceGuard;
  };

  return (
    <View style={styles.contentContainer}>
      {isLoading && (
        <ActivityIndicator
          color={Colors.primary}
          style={styles.contentContainer}
        />
      )}
      {isLoaded && differenceGuard && (
        <View style={styles.weatherContainer}>
          {forecast && <Text style={styles.text}>{forecast[0].main}</Text>}
        </View>
      )}
      {isLoaded && !isLoading && !differenceGuard && (
        <View style={styles.itemlessContainer}>
          <Text style={[styles.text, styles.itemlessText]}>
            Weather forecast is not available for your trip!
          </Text>
          {/* button to */}
          <TouchableOpacity
            onPress={() => {
              setDifferenceGuard(true);
            }}>
            <Text style={[styles.action, styles.actionContainer]}>
              Check the forecast for next 7 days
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Weather;
