import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  ScrollView as Container,
  Headline,
  ItemlessFrame,
  TextInput,
} from 'utils';
import { View } from 'react-native';

const HotelRecommendationContainer = (props) => {
  const { startDate, endDate, cityCode } = props.route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [isDateSame, setIsDateSame] = useState(true);

  const formatDate = (date) => {
    //format to YYYY-MM-DD
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  useEffect(() => {
    if (formatDate(startDate) === formatDate(endDate)) {
      setIsDateSame(true);
    } else {
      setIsDateSame(false);
    }
  }, [startDate, endDate]);

  return (
    <Container>
      <View>
        <Headline>Add your accomodation by typing name of your hotel</Headline>
      </View>
    </Container>
  );
};

export default HotelRecommendationContainer;
