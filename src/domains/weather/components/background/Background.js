import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const Background = (props) => {
  const icon = props.activeDay.icon;
  // group of icons for which the sky should be clear
  const group1 = ['01d', '02d', '10d'];
  // group of icons for which the sky should be cloudy
  const group2 = ['03d', '04d', '09d', '13d', '50d'];
  // group of icons for which the sky should be darker
  const group3 = ['11d'];
  // group of icos for which the sky should be dark
  const group4 = [
    '01n',
    '02n',
    '03n',
    '04n',
    '09n',
    '10n',
    '11n',
    '13n',
    '50n',
  ];

  if (group1.includes(icon)) {
    return (
      <LinearGradient
        colors={['#80E0FF', '#2BABE1']} // intense light blue
        style={props.styles.linearGradient}>
        {props.children}
      </LinearGradient>
    );
  } else if (group2.includes(icon)) {
    return (
      <LinearGradient
        colors={['#999999', '#99ccff']} // grey to light blue
        style={props.styles.linearGradient}>
        {props.children}
      </LinearGradient>
    );
  } else if (group3.includes(icon)) {
    return (
      <LinearGradient
        colors={['#475f6b', '#6A7B8A']} // low sat blue to grey
        style={props.styles.linearGradient}>
        {props.children}
      </LinearGradient>
    );
  } else if (group4.includes(icon)) {
    return (
      <LinearGradient
        colors={['#000d4d', '#000d68']} // dark navy
        style={props.styles.linearGradient}>
        {props.children}
      </LinearGradient>
    );
  } else {
    return (
      <LinearGradient
        colors={['#80E0FF', '#2BABE1']} // intense light blue (just as a fallback)
        style={props.styles.linearGradient}>
        {props.children}
      </LinearGradient>
    );
  }
};

export default Background;
