import React, { useState, useEffect } from 'react';
import {
  Button,
  ScrollView as Container,
  Headline,
  TextInput,
  Text,
} from 'utils';
import { View } from 'react-native';
import { styles } from './AddAccommodationByNameStyleContainer';

const AddAccommodationByNameContainer = (props) => {
  const [isDateSame, SetIsDateSame] = useState(true);
  const [error, setError] = useState('');
  const [value, setValue] = useState('');
  const { startDate, endDate } = props.route.params;
  let formattedStartDate = '';
  let formattedEndDate = '';

  function formatDate(date) {
    //format to YYYY-MM-DD
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  const handleChange = (val) => {
    setValue(val);
  };

  const handlePress = () => {
    handleChange();
    formattedStartDate = formatDate(startDate);
    formattedEndDate = formatDate(endDate);
    console.log(formattedEndDate, formattedStartDate);
  };

  useEffect(() => {
    if (formatDate(startDate) == formatDate(endDate)) {
      SetIsDateSame(true);
    } else {
      SetIsDateSame(false);
    }
  });

  if (isDateSame)
    return (
      <Container>
        <View style={styles.itemlessContainer}>
          <Text style={[styles.text, styles.itemlessText]}>
            Searching for a hotel by name is not possible if you are going on a
            one day trip!
          </Text>
        </View>
      </Container>
    );

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
