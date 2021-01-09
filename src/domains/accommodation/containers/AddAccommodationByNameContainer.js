import React, { useState, useEffect } from 'react';
import { Button, ScrollView as Container, Headline, TextInput } from 'utils';
import { View } from 'react-native';

const AddAccommodationByNameContainer = (props) => {
  const [enabled, setEnabled] = useState(false);
  const [error, setError] = useState('');
  const [value, setValue] = useState('');
  const { startDate, endDate } = props.route.params;

  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return console.log([year, month, day].join('-'));
  }

  const handleChange = (val) => {
    setValue(val);
  };

  const handlePress = () => {
    handleChange();
  };

  useEffect(() => {});

  return (
    <Container>
      <View style={{ marginTop: 10, marginBottom: 10 }}>
        <Headline>Add your accomodation by typing name of your hotel</Headline>
      </View>
      <TextInput
        label={'Hotel address'}
        error={error}
        onChange={handleChange}
        value={value}
      />
      <Button onPress={handlePress}>Submit</Button>
    </Container>
  );
};

export default AddAccommodationByNameContainer;
