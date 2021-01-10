import React, { useState, useEffect, useCallback } from 'react';
import {
  Button,
  ScrollView as Container,
  Headline,
  TextInput,
  ItemlessFrame,
} from 'utils';
import { View } from 'react-native';

const AddAccommodationByNameContainer = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDateSame, SetIsDateSame] = useState(true);
  const [error, setError] = useState('');
  const [value, setValue] = useState('');
  const { startDate, endDate, destination, cityCode } = props.route.params;
  console.log(cityCode);
  let formattedStartDate = '';
  let formattedEndDate = '';

  const formatDate = (date) => {
    //format to YYYY-MM-DD
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  const handleChange = (val) => {
    setValue(val);
  };

  const handlePress = () => {
    handleChange();
    formattedStartDate = formatDate(startDate);
    formattedEndDate = formatDate(endDate);
    setIsLoading(true);
  };

  useEffect(() => {
    if (formatDate(startDate) == formatDate(endDate)) {
      SetIsDateSame(true);
    } else {
      SetIsDateSame(false);
    }
  }, [startDate, endDate, destination]);

  if (isDateSame)
    return (
      <ItemlessFrame
        message="Searching for a hotel by name is not possible if you are going on a
    one day trip!"
      />
    );

  return (
    <Container>
      <View style={{ marginTop: 10, marginBottom: 10 }}>
        <Headline>Add your accomodation by typing name of your hotel</Headline>
      </View>
      <TextInput
        label="Hotel name"
        error={error}
        onChange={handleChange}
        value={value}
      />
      <Button loading={isLoading} disabled={isLoading} onPress={handlePress}>
        Submit
      </Button>
    </Container>
  );
};

export default AddAccommodationByNameContainer;
