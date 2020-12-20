import React from 'react';
import { ScrollView, Text } from 'react-native';

import { Input } from 'utils';
import { styles } from './AddAccommodationContainerStyle';

const AddAccommodationContainer = (props) => {
  //const tripId = props.route.params.tripId;

  return (
    <ScrollView indicatorStyle="white" style={styles.container}>
      <Text>Hello!</Text>
      <Input />
    </ScrollView>
  );
};

export default AddAccommodationContainer;
