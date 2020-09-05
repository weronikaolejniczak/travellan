import React, {useState, useCallback, useEffect} from 'react';
import { View, ScrollView, Text, Image} from 'react-native';
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
    maxTemp: "loading", // Celsius
    minTemp: "loading", // Celsius
    tempDay: "loading", // Celsius
    tempNight: "loading", // Celsius
    tempFeels_like_day: "loading", //Celsius
    tempFeels_like_night: "loading", //Celsius
    pressure: "loading", // hPa
    humidity: "loading", // %
    wind_speed: "loading", // m/s
    cloudiness: "loading", //  %
    description: 'loading', // string
    rain: 'loading', 
    icon: 'loading',

  })

  useEffect(()=>{
    getWeather();
  },[])
  
  const getWeather = ()=>{
    fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={hourly,current,minutely}&APPID=${client_id}&units=metric`)
    .then(data=>data.json())
    .then(results=>{ 
      setInfo({
        maxTemp: results.daily[0].temp.max,
        minTemp: results.daily[0].temp.min,
        tempDay: results.daily[0].temp.day,
        tempNight: results.daily[0].temp.night,
        tempFeels_like_day: results.daily[0].feels_like.day,
        tempFeels_like_night: results.daily[0].feels_like.night,
        pressure: results.daily[0].pressure,
        humidity: results.daily[0].humidity,
        wind_speed: results.daily[0].wind_speed,
        cloudiness: results.daily[0].clouds,
        description: results.daily[0].weather[0].description,
        rain: results.daily[0].pop,
        icon: results.daily[0].weather[0].icon,
      })
    })
  }
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Image 
        style={{width: 70, height: 70}}
        source={{ uri:"http://openweathermap.org/img/wn/"+info.icon+".png"}}
      />
      <Text>Max Temperature: {info.maxTemp}°C</Text>
      <Text>Min Temperature: {info.minTemp}°C</Text>
      <Text>Day Temperature: {info.tempDay}°C</Text>
      <Text>Night Temperature: {info.tempNight}°C</Text>
      <Text>Feels like day temperature: {info.tempFeels_like_day}°C</Text>
      <Text>Feels like night temperature: {info.tempFeels_like_night}°C</Text>
      <Text>Pressure: {info.pressure}hPa</Text>
      <Text>Humidity: {info.humidity}%</Text>
      <Text>Wind Speed: {info.wind_speed}m/s</Text>
      <Text>Cloudiness: {info.cloudiness}%</Text>
      <Text>Description: {info.description}</Text>
      <Text>Propability of rain: {info.rain * 100}%</Text>
      {/*<Text>Icon id: {info.icon}</Text>*/}
    </ScrollView>
  );
};

export default Weather;
