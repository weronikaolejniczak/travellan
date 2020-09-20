import React from 'react';
import {View, Dimensions} from 'react-native';
/* day graphics */
import Sun from 'assets/images/sun.svg';
import SunWithClouds from 'assets/images/sun_with_clouds.svg';
import Rain from 'assets/images/rain.svg';
/* night graphics */
import Moon from 'assets/images/moon1.svg';
import MoonWithClouds from 'assets/images/moon_with_clouds.svg';
import MoonRain from 'assets/images/moon_rain.svg';
/* common graphics */
import BrokenClouds from 'assets/images/broken_clouds.svg';
import ScatteredClouds from 'assets/images/scattered_clouds.svg';
import HeavyRain from 'assets/images/heavy_rain.svg';
import Thunderstorm from 'assets/images/storm.svg';
import Snow from 'assets/images/snow.svg';
import Mist from 'assets/images/mist.svg';

const windowWidth = Dimensions.get('window').width;

/* the letter in icon name describes time of day: 'd' for day, 'n' for night */
const Graphics = (props) => {
  // day icons
  if (props.activeDay.icon === '01d') {
    return <Sun width={windowWidth * 0.45} />; // clear sky
  } else if (props.activeDay.icon === '01n') {
    return <Moon width={windowWidth * 0.6} />; // clear sky at night
  } else if (props.activeDay.icon === '02d') {
    return <SunWithClouds width={windowWidth * 0.45} />; // few clouds
  } else if (props.activeDay.icon === '02n') {
    return <MoonWithClouds width={windowWidth * 0.45} />; // few clouds at night
  } else if (props.activeDay.icon === '03d' || props.activeDay.icon === '03n') {
    return <ScatteredClouds width={windowWidth * 0.55} />; // scattered clouds
  } else if (props.activeDay.icon === '04d' || props.activeDay.icon === '04n') {
    return <BrokenClouds width={windowWidth * 0.55} />; // broken clouds
  } else if (props.activeDay.icon === '09d' || props.activeDay.icon === '09n') {
    return <HeavyRain width={windowWidth * 0.45} />; // shower rain
  } else if (props.activeDay.icon === '10d') {
    return <Rain width={windowWidth * 0.4} />; // rain
  } else if (props.activeDay.icon === '10n') {
    return <MoonRain width={windowWidth * 0.45} />; // rain at night
  } else if (props.activeDay.icon === '11d' || props.activeDay.icon === '11n') {
    return <Thunderstorm width={windowWidth * 0.55} />; // thunderstorm
  } else if (props.activeDay.icon === '13d' || props.activeDay.icon === '13n') {
    return <Snow width={windowWidth * 0.45} />; // snow
  } else if (props.activeDay.icon === '50d' || props.activeDay.icon === '50n') {
    return <Mist width={windowWidth * 0.8} />; // mist
  } else {
    return <View />;
  }
};

export default Graphics;
