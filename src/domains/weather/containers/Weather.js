import React, {useState, useCallback, useEffect} from 'react';
import {Button, View, ScrollView, Text, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
/** IMPORTS FROM WITHIN THE MODULE */
import {fetchWeather} from 'weather/services/Weather';
import {weatherStyle as styles} from './WeatherStyle';
import Colors from 'constants/Colors';
import {WEATHER_ID} from 'react-native-dotenv';

const client_id = WEATHER_ID;

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

  useEffect(()=>{
    getWeather();
  },[])
  
  const getWeather = ()=>{
    fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={hourly,current,minutely}&APPID=${client_id}&units=metric`)
    .then(data=>data.json())
    .then(results=>{ console.log(results)
      /*setInfo({
        country: results.country,
        city:results.name,
        temp:results.temp,

      })*/
    })
  }
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Text>Weather</Text>
    </ScrollView>
  );
};

export default Weather;
