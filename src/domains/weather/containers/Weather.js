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
  const startDate = selectedTrip.startDate.split(' ').slice(1, 4).join(' ');

  const [info,setInfo]= useState({
    //FIRST DAY
    date_1: new Date("loading"),
    sunrise_1: new Date("loading"),
    sunset_1: new Date("loading"),
    maxTemp_1: "loading", // Celsius
    minTemp_1: "loading", // Celsius
    tempDay_1: "loading", // Celsius
    tempNight_1: "loading", // Celsius
    tempFeels_like_day_1: "loading", //Celsius
    tempFeels_like_night_1: "loading", //Celsius
    pressure_1: "loading", // hPa
    humidity_1: "loading", // %
    wind_speed_1: "loading", // m/s
    cloudiness_1: "loading", //  %
    description_1: 'loading', // string
    rain_1: 'loading', // propability
    icon_1: 'loading', // icon id
    //SECOND DAY
    date_2: new Date("loading"),
    sunrise_2: new Date("loading"),
    sunset_2: new Date("loading"),
    maxTemp_2: "loading", // Celsius
    minTemp_2: "loading", // Celsius
    tempDay_2: "loading", // Celsius
    tempNight_2: "loading", // Celsius
    tempFeels_like_day_2: "loading", //Celsius
    tempFeels_like_night_2: "loading", //Celsius
    pressure_2: "loading", // hPa
    humidity_2: "loading", // %
    wind_speed_2: "loading", // m/s
    cloudiness_2: "loading", //  %
    description_2: 'loading', // string
    rain_2: 'loading', // propability
    icon_2: 'loading', // icon id
    //THIRD DAY
    date_3: new Date("loading"),
    sunrise_3: new Date("loading"),
    sunset_3: new Date("loading"),
    maxTemp_3: "loading", // Celsius
    minTemp_3: "loading", // Celsius
    tempDay_3: "loading", // Celsius
    tempNight_3: "loading", // Celsius
    tempFeels_like_day_3: "loading", //Celsius
    tempFeels_like_night_3: "loading", //Celsius
    pressure_3: "loading", // hPa
    humidity_3: "loading", // %
    wind_speed_3: "loading", // m/s
    cloudiness_3: "loading", //  %
    description_3: 'loading', // string
    rain_3: 'loading', // propability
    icon_3: 'loading', // icon id
    //FOURTH DAY
    date_4: new Date("loading"),
    sunrise_4: new Date("loading"),
    sunset_4: new Date("loading"),
    maxTemp_4: "loading", // Celsius
    minTemp_4: "loading", // Celsius
    tempDay_4: "loading", // Celsius
    tempNight_4: "loading", // Celsius
    tempFeels_like_day_4: "loading", //Celsius
    tempFeels_like_night_4: "loading", //Celsius
    pressure_4: "loading", // hPa
    humidity_4: "loading", // %
    wind_speed_4: "loading", // m/s
    cloudiness_4: "loading", //  %
    description_4: 'loading', // string
    rain_4: 'loading', // propability
    icon_4: 'loading', // icon id
    //FIFTH DAY
    date_5: new Date("loading"),
    sunrise_5: new Date("loading"),
    sunset_5: new Date("loading"),
    maxTemp_5: "loading", // Celsius
    minTemp_5: "loading", // Celsius
    tempDay_5: "loading", // Celsius
    tempNight_5: "loading", // Celsius
    tempFeels_like_day_5: "loading", //Celsius
    tempFeels_like_night_5: "loading", //Celsius
    pressure_5: "loading", // hPa
    humidity_5: "loading", // %
    wind_speed_5: "loading", // m/s
    cloudiness_5: "loading", //  %
    description_5: 'loading', // string
    rain_5: 'loading', // propability
    icon_5: 'loading', // icon id
    //SIXTH DAY
    date_6: new Date("loading"),
    sunrise_6: new Date("loading"),
    sunset_6: new Date("loading"),
    maxTemp_6: "loading", // Celsius
    minTemp_6: "loading", // Celsius
    tempDay_6: "loading", // Celsius
    tempNight_6: "loading", // Celsius
    tempFeels_like_day_6: "loading", //Celsius
    tempFeels_like_night_6: "loading", //Celsius
    pressure_6: "loading", // hPa
    humidity_6: "loading", // %
    wind_speed_6: "loading", // m/s
    cloudiness_6: "loading", //  %
    description_6: 'loading', // string
    rain_6: 'loading', // propability
    icon_6: 'loading', // icon id
    //SEVENTH DAY
    date_7: new Date("loading"),
    sunrise_7: new Date("loading"),
    sunset_7: new Date("loading"),
    maxTemp_7: "loading", // Celsius
    minTemp_7: "loading", // Celsius
    tempDay_7: "loading", // Celsius
    tempNight_7: "loading", // Celsius
    tempFeels_like_day_7: "loading", //Celsius
    tempFeels_like_night_7: "loading", //Celsius
    pressure_7: "loading", // hPa
    humidity_7: "loading", // %
    wind_speed_7: "loading", // m/s
    cloudiness_7: "loading", //  %
    description_7: 'loading', // string
    rain_7: 'loading', // propability
    icon_7: 'loading', // icon id

  })

  useEffect(()=>{
    getWeather();
  },[])
  
  const getWeather = ()=>{
    fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={hourly,current,minutely}&APPID=${client_id}&units=metric`)
    .then(data=>data.json())
    .then(results=>{ 
      setInfo({
        //FIRST DAY
        date_1: new Date(results.daily[0].dt*1000), //*1000 for future convert from UNIX to human readable
        sunrise_1: new Date(results.daily[0].sunrise*1000),
        sunset_1: new Date(results.daily[0].sunset*1000),
        maxTemp_1: results.daily[0].temp.max,
        minTemp_1: results.daily[0].temp.min,
        tempDay_1: results.daily[0].temp.day,
        tempNight_1: results.daily[0].temp.night,
        tempFeels_like_day_1: results.daily[0].feels_like.day,
        tempFeels_like_night_1: results.daily[0].feels_like.night,
        pressure_1: results.daily[0].pressure,
        humidity_1: results.daily[0].humidity,
        wind_speed_1: results.daily[0].wind_speed,
        cloudiness_1: results.daily[0].clouds,
        description_1: results.daily[0].weather[0].description,
        rain_1: results.daily[0].pop,
        icon_1: results.daily[0].weather[0].icon,
        //SECOND DAY
        date_2: new Date(results.daily[1].dt*1000), //*1000 for future convert from UNIX to human readable
        sunrise_2: new Date(results.daily[1].sunrise*1000),
        sunset_2: new Date(results.daily[1].sunset*1000),
        maxTemp_2: results.daily[1].temp.max,
        minTemp_2: results.daily[1].temp.min,
        tempDay_2: results.daily[1].temp.day,
        tempNight_2: results.daily[1].temp.night,
        tempFeels_like_day_2: results.daily[1].feels_like.day,
        tempFeels_like_night_2: results.daily[1].feels_like.night,
        pressure_2: results.daily[1].pressure,
        humidity_2: results.daily[1].humidity,
        wind_speed_2: results.daily[1].wind_speed,
        cloudiness_2: results.daily[1].clouds,
        description_2: results.daily[1].weather[0].description,
        rain_2: results.daily[1].pop,
        icon_2: results.daily[1].weather[0].icon,
        //THIRD DAY
        date_3: new Date(results.daily[2].dt*1000), //*1000 for future convert from UNIX to human readable
        sunrise_3: new Date(results.daily[2].sunrise*1000),
        sunset_3: new Date(results.daily[2].sunset*1000),
        maxTemp_3: results.daily[2].temp.max,
        minTemp_3: results.daily[2].temp.min,
        tempDay_3: results.daily[2].temp.day,
        tempNight_3: results.daily[2].temp.night,
        tempFeels_like_day_3: results.daily[2].feels_like.day,
        tempFeels_like_night_3: results.daily[2].feels_like.night,
        pressure_3: results.daily[2].pressure,
        humidity_3: results.daily[2].humidity,
        wind_speed_3: results.daily[2].wind_speed,
        cloudiness_3: results.daily[2].clouds,
        description_3: results.daily[2].weather[0].description,
        rain_3: results.daily[2].pop,
        icon_3: results.daily[2].weather[0].icon,
        //FOURTH DAY
        date_4: new Date(results.daily[3].dt*1000), //*1000 for future convert from UNIX to human readable
        sunrise_4: new Date(results.daily[3].sunrise*1000),
        sunset_4: new Date(results.daily[3].sunset*1000),
        maxTemp_4: results.daily[3].temp.max,
        minTemp_4: results.daily[3].temp.min,
        tempDay_4: results.daily[3].temp.day,
        tempNight_4: results.daily[3].temp.night,
        tempFeels_like_day_4: results.daily[3].feels_like.day,
        tempFeels_like_night_4: results.daily[3].feels_like.night,
        pressure_4: results.daily[3].pressure,
        humidity_4: results.daily[3].humidity,
        wind_speed_4: results.daily[3].wind_speed,
        cloudiness_4: results.daily[3].clouds,
        description_4: results.daily[3].weather[0].description,
        rain_4: results.daily[3].pop,
        icon_4: results.daily[3].weather[0].icon,
        //FIFTH DAY
        date_5: new Date(results.daily[4].dt*1000), //*1000 for future convert from UNIX to human readable
        sunrise_5: new Date(results.daily[4].sunrise*1000),
        sunset_5: new Date(results.daily[4].sunset*1000),
        maxTemp_5: results.daily[4].temp.max,
        minTemp_5: results.daily[4].temp.min,
        tempDay_5: results.daily[4].temp.day,
        tempNight_5: results.daily[4].temp.night,
        tempFeels_like_day_5: results.daily[4].feels_like.day,
        tempFeels_like_night_5: results.daily[4].feels_like.night,
        pressure_5: results.daily[4].pressure,
        humidity_5: results.daily[4].humidity,
        wind_speed_5: results.daily[4].wind_speed,
        cloudiness_5: results.daily[4].clouds,
        description_5: results.daily[4].weather[0].description,
        rain_5: results.daily[4].pop,
        icon_5: results.daily[4].weather[0].icon,
        //SIXTH DAY
        date_6: new Date(results.daily[5].dt*1000), //*1000 for future convert from UNIX to human readable
        sunrise_6: new Date(results.daily[5].sunrise*1000),
        sunset_6: new Date(results.daily[5].sunset*1000),
        maxTemp_6: results.daily[5].temp.max,
        minTemp_6: results.daily[5].temp.min,
        tempDay_6: results.daily[5].temp.day,
        tempNight_6: results.daily[5].temp.night,
        tempFeels_like_day_6: results.daily[5].feels_like.day,
        tempFeels_like_night_6: results.daily[5].feels_like.night,
        pressure_6: results.daily[5].pressure,
        humidity_6: results.daily[5].humidity,
        wind_speed_6: results.daily[5].wind_speed,
        cloudiness_6: results.daily[5].clouds,
        description_6: results.daily[5].weather[0].description,
        rain_6: results.daily[5].pop,
        icon_6: results.daily[5].weather[0].icon,
        //SEVENTH DAY
        date_7: new Date(results.daily[6].dt*1000), //*1000 for future convert from UNIX to human readable
        sunrise_7: new Date(results.daily[6].sunrise*1000),
        sunset_7: new Date(results.daily[6].sunset*1000),
        maxTemp_7: results.daily[6].temp.max,
        minTemp_7: results.daily[6].temp.min,
        tempDay_7: results.daily[6].temp.day,
        tempNight_7: results.daily[6].temp.night,
        tempFeels_like_day_7: results.daily[6].feels_like.day,
        tempFeels_like_night_7: results.daily[6].feels_like.night,
        pressure_7: results.daily[6].pressure,
        humidity_7: results.daily[6].humidity,
        wind_speed_7: results.daily[6].wind_speed,
        cloudiness_7: results.daily[6].clouds,
        description_7: results.daily[6].weather[0].description,
        rain_7: results.daily[6].pop,
        icon_7: results.daily[6].weather[0].icon,

      })
    })
    console.log(startDate);
    return Promise.resolve((info));
  }


  

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Image 
        style={{width: 70, height: 70}}
        source={{ uri:"http://openweathermap.org/img/wn/"+info.icon_1+".png"}}
      />
      {/*FIRST DAY*/}
      <Text>Date: {(info.date_1).toDateString()}</Text>
      <Text>Sunrise: {(info.sunrise_1).toTimeString()}</Text>
      <Text>Sunset: {(info.sunset_1).toTimeString()}</Text>
      <Text>Max Temperature: {info.maxTemp_1}°C</Text>
      <Text>Min Temperature: {info.minTemp_1}°C</Text>
      <Text>Day Temperature: {info.tempDay_1}°C</Text>
      <Text>Night Temperature: {info.tempNight_1}°C</Text>
      <Text>Feels like day temperature: {info.tempFeels_like_day_1}°C</Text>
      <Text>Feels like night temperature: {info.tempFeels_like_night_1}°C</Text>
      <Text>Pressure: {info.pressure_1}hPa</Text>
      <Text>Humidity: {info.humidity_1}%</Text>
      <Text>Wind Speed: {info.wind_speed_1}m/s</Text>
      <Text>Cloudiness: {info.cloudiness_1}%</Text>
      <Text>Description: {info.description_1}</Text>
      <Text>Propability of rain: {(info.rain_1 * 100).toFixed(0)}%</Text>
      {/*<Text>Icon id: {info.icon_1}</Text>*/}
      {/*SECOND DAY*/}
      <Image 
        style={{width: 70, height: 70}}
        source={{ uri:"http://openweathermap.org/img/wn/"+info.icon_2+".png"}}
      />
      <Text>Date: {(info.date_2).toDateString()}</Text>
      <Text>Sunrise: {(info.sunrise_2).toTimeString()}</Text>
      <Text>Sunset: {(info.sunset_2).toTimeString()}</Text>
      <Text>Max Temperature: {info.maxTemp_2}°C</Text>
      <Text>Min Temperature: {info.minTemp_2}°C</Text>
      <Text>Day Temperature: {info.tempDay_2}°C</Text>
      <Text>Night Temperature: {info.tempNight_2}°C</Text>
      <Text>Feels like day temperature: {info.tempFeels_like_day_2}°C</Text>
      <Text>Feels like night temperature: {info.tempFeels_like_night_2}°C</Text>
      <Text>Pressure: {info.pressure_2}hPa</Text>
      <Text>Humidity: {info.humidity_2}%</Text>
      <Text>Wind Speed: {info.wind_speed_2}m/s</Text>
      <Text>Cloudiness: {info.cloudiness_2}%</Text>
      <Text>Description: {info.description_2}</Text>
      <Text>Propability of rain: {(info.rain_2 * 100).toFixed(0)}%</Text>
      {/*<Text>Icon id: {info.icon_1}</Text>*/}
      {/*THIRD DAY*/}
      <Image 
        style={{width: 70, height: 70}}
        source={{ uri:"http://openweathermap.org/img/wn/"+info.icon_3+".png"}}
      />
      <Text>Date: {(info.date_3).toDateString()}</Text>
      <Text>Sunrise: {(info.sunrise_3).toTimeString()}</Text>
      <Text>Sunset: {(info.sunset_3).toTimeString()}</Text>
      <Text>Max Temperature: {info.maxTemp_3}°C</Text>
      <Text>Min Temperature: {info.minTemp_3}°C</Text>
      <Text>Day Temperature: {info.tempDay_3}°C</Text>
      <Text>Night Temperature: {info.tempNight_3}°C</Text>
      <Text>Feels like day temperature: {info.tempFeels_like_day_3}°C</Text>
      <Text>Feels like night temperature: {info.tempFeels_like_night_3}°C</Text>
      <Text>Pressure: {info.pressure_3}hPa</Text>
      <Text>Humidity: {info.humidity_3}%</Text>
      <Text>Wind Speed: {info.wind_speed_3}m/s</Text>
      <Text>Cloudiness: {info.cloudiness_3}%</Text>
      <Text>Description: {info.description_3}</Text>
      <Text>Propability of rain: {(info.rain_3 * 100).toFixed(0)}%</Text>
      {/*<Text>Icon id: {info.icon_3}</Text>*/}
      {/*FOURTH DAY*/}
      <Image 
        style={{width: 70, height: 70}}
        source={{ uri:"http://openweathermap.org/img/wn/"+info.icon_4+".png"}}
      />
      <Text>Date: {(info.date_4).toDateString()}</Text>
      <Text>Sunrise: {(info.sunrise_4).toTimeString()}</Text>
      <Text>Sunset: {(info.sunset_4).toTimeString()}</Text>
      <Text>Max Temperature: {info.maxTemp_4}°C</Text>
      <Text>Min Temperature: {info.minTemp_4}°C</Text>
      <Text>Day Temperature: {info.tempDay_4}°C</Text>
      <Text>Night Temperature: {info.tempNight_4}°C</Text>
      <Text>Feels like day temperature: {info.tempFeels_like_day_4}°C</Text>
      <Text>Feels like night temperature: {info.tempFeels_like_night_4}°C</Text>
      <Text>Pressure: {info.pressure_4}hPa</Text>
      <Text>Humidity: {info.humidity_4}%</Text>
      <Text>Wind Speed: {info.wind_speed_4}m/s</Text>
      <Text>Cloudiness: {info.cloudiness_4}%</Text>
      <Text>Description: {info.description_4}</Text>
      <Text>Propability of rain: {(info.rain_4 * 100).toFixed(0)}%</Text>
      {/*<Text>Icon id: {info.icon_4}</Text>*/}
      {/*FIFTH DAY*/}
      <Image 
        style={{width: 70, height: 70}}
        source={{ uri:"http://openweathermap.org/img/wn/"+info.icon_5+".png"}}
      />
      <Text>Date: {(info.date_5).toDateString()}</Text>
      <Text>Sunrise: {(info.sunrise_5).toTimeString()}</Text>
      <Text>Sunset: {(info.sunset_5).toTimeString()}</Text>
      <Text>Max Temperature: {info.maxTemp_5}°C</Text>
      <Text>Min Temperature: {info.minTemp_5}°C</Text>
      <Text>Day Temperature: {info.tempDay_5}°C</Text>
      <Text>Night Temperature: {info.tempNight_5}°C</Text>
      <Text>Feels like day temperature: {info.tempFeels_like_day_5}°C</Text>
      <Text>Feels like night temperature: {info.tempFeels_like_night_5}°C</Text>
      <Text>Pressure: {info.pressure_5}hPa</Text>
      <Text>Humidity: {info.humidity_5}%</Text>
      <Text>Wind Speed: {info.wind_speed_5}m/s</Text>
      <Text>Cloudiness: {info.cloudiness_5}%</Text>
      <Text>Description: {info.description_5}</Text>
      <Text>Propability of rain: {(info.rain_5 * 100).toFixed(0)}%</Text>
      {/*<Text>Icon id: {info.icon_5}</Text>*/}
      {/*SIXTH DAY*/}
      <Image 
        style={{width: 70, height: 70}}
        source={{ uri:"http://openweathermap.org/img/wn/"+info.icon_6+".png"}}
      />
      <Text>Date: {(info.date_6).toDateString()}</Text>
      <Text>Sunrise: {(info.sunrise_6).toTimeString()}</Text>
      <Text>Sunset: {(info.sunset_6).toTimeString()}</Text>
      <Text>Max Temperature: {info.maxTemp_6}°C</Text>
      <Text>Min Temperature: {info.minTemp_6}°C</Text>
      <Text>Day Temperature: {info.tempDay_6}°C</Text>
      <Text>Night Temperature: {info.tempNight_6}°C</Text>
      <Text>Feels like day temperature: {info.tempFeels_like_day_6}°C</Text>
      <Text>Feels like night temperature: {info.tempFeels_like_night_6}°C</Text>
      <Text>Pressure: {info.pressure_6}hPa</Text>
      <Text>Humidity: {info.humidity_6}%</Text>
      <Text>Wind Speed: {info.wind_speed_6}m/s</Text>
      <Text>Cloudiness: {info.cloudiness_6}%</Text>
      <Text>Description: {info.description_6}</Text>
      <Text>Propability of rain: {(info.rain_6 * 100).toFixed(0)}%</Text>
      {/*<Text>Icon id: {info.icon_6}</Text>*/}
      {/*SEVENTH DAY*/}
      <Image 
        style={{width: 70, height: 70}}
        source={{ uri:"http://openweathermap.org/img/wn/"+info.icon_7+".png"}}
      />
      <Text>Date: {(info.date_7).toDateString()}</Text>
      <Text>Sunrise: {(info.sunrise_7).toTimeString()}</Text>
      <Text>Sunset: {(info.sunset_7).toTimeString()}</Text>
      <Text>Max Temperature: {info.maxTemp_7}°C</Text>
      <Text>Min Temperature: {info.minTemp_7}°C</Text>
      <Text>Day Temperature: {info.tempDay_7}°C</Text>
      <Text>Night Temperature: {info.tempNight_7}°C</Text>
      <Text>Feels like day temperature: {info.tempFeels_like_day_7}°C</Text>
      <Text>Feels like night temperature: {info.tempFeels_like_night_7}°C</Text>
      <Text>Pressure: {info.pressure_7}hPa</Text>
      <Text>Humidity: {info.humidity_7}%</Text>
      <Text>Wind Speed: {info.wind_speed_7}m/s</Text>
      <Text>Cloudiness: {info.cloudiness_7}%</Text>
      <Text>Description: {info.description_7}</Text>
      <Text>Propability of rain: {(info.rain_7 * 100).toFixed(0)}%</Text>
      {/*<Text>Icon id: {info.icon_7}</Text>*/}
    </ScrollView>
  );
};

export default Weather;
