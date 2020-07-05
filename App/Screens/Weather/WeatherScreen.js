import React, {useState, useCallback, useEffect} from 'react';
import {Button, View, ScrollView, Text, ActivityIndicator} from 'react-native';
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

  const [info,setInfo]= useState({
    name: "loading",
    temp: "loading",
    humidity: "loading",
    desc: "loading",
    icon: "loading",
  })
  
  const getWeather = ()=>{
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=2cc313a48db97496e06a2253be1b2caf`)
    .then(data=>data.json())
    .then(results=>{
      console.log(results)
    })
  }
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Button title="test" onPress={getWeather()}/>
    </ScrollView>
  );
};

export default WeatherScreen;
