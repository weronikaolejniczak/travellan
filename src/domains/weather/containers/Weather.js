import React, {useState, useCallback, useEffect} from 'react';
import {Button, View, ScrollView, Text, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
/** IMPORTS FROM WITHIN THE MODULE */
import {fetchWeather} from 'weather/services/Weather';
import {weatherStyle as styles} from './WeatherStyle';
import Colors from 'constants/Colors';

/** Weather container */
const Weather = (props) => {
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
  );
  const region = selectedTrip.region;
  const latitude = region.latitude;
  const longitude = region.longitude;

  const [info,setInfo]= useState({
    country:"loading",
    city: "loading",
    temp: "loading",

  })
  
  const getWeather = ()=>{
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=2cc313a48db97496e06a2253be1b2caf&units=metric`)
    .then(data=>data.json())
    .then(results=>{
      setInfo({
        country: results.country,
        city:results.name,
        temp:results.temp,

      })
    })
  }
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Button title="test" onPress={getWeather()}/>
    </ScrollView>
  );
};

export default Weather;
