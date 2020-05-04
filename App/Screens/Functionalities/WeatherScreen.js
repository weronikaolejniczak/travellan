/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, Text} from 'react-native';

const WeatherScreen = (props) => {
  return (
    <ScrollView style={{backgroundColor: '#222222', flex: 1}}>
      <Text>Weather</Text>
    </ScrollView>
  );
};

export default WeatherScreen;
