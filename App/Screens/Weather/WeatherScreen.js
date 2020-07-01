import React, {useState, useCallback, useEffect} from 'react';
import {View, ScrollView, Text, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
/** IMPORTS FROM WITHIN THE MODULE */
import {fetchWeather} from '../../Services/WeatherService';
import {weatherScreenStyle as styles} from './WeatherScreenStyle';
import Colors from '../../Constants/Colors';

/** WEATHER SCREEN */
const WeatherScreen = (props) => {
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
  );
  const region = selectedTrip.region;
  const latitude = region.latitude;
  const longitude = region.longitude;

  /** STATE VARIABLES AND STATE SETTER FUNCTIONS */
  const [currentWeather, setCurrentWeather] = useState();
  const [dailyWeather, setDailyWeather] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  /** HANDLERS */
  const loadWeather = useCallback(async () => {
    setIsLoading(true);
    try {
      await fetchWeather(latitude, longitude).then((result) => {
        setCurrentWeather(result.current);
        setDailyWeather(result.daily);
      });
    } catch (err) {
      console.log(err.message);
    }
    setIsLoading(false);
  }, [latitude, longitude]);

  useEffect(() => {
    !isLoaded &&
      loadWeather().then(() => {
        setIsLoading(false);
        setIsLoaded(true);
      });
  }, [isLoaded, loadWeather]);

  if (isLoading) {
    return (
      <View style={[styles.centered, {backgroundColor: Colors.background}]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Text style={styles.text}>
        {isLoaded && new Date(currentWeather.dt).toTimeString()}
        {isLoaded && new Date(dailyWeather[0].dt).toTimeString()}
      </Text>
    </ScrollView>
  );
};

export default WeatherScreen;
