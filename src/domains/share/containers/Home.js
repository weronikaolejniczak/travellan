import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import ShareExtension from 'rn-extensions-share';

import { store } from 'src/store';
import { homeStyle as styles } from './HomeStyle';

const Home = (props) => {
  const [type, setType] = useState(undefined);
  const [value, setValue] = useState(undefined);
  const [token, setToken] = useState(undefined);
  const [userId, setUserId] = useState(undefined);
  const [error, setError] = useState(null);
  const [trips, setTrips] = useState(undefined);

  const bookingRegex = new RegExp('www.booking.com/hotel');
  const PDFRegex = new RegExp('^file:.*.pdf$');

  useEffect(() => {
    // get token and id of logged in user from the store
    setToken(store.getState().auth.token);
    setUserId(store.getState().auth.userId);
    if (token === null && userId === null) {
      setError('You are not logged in.');
    } else if (token !== null && userId !== null) {
      setTrips(store.getState().trips.trips);
    }

    type ? null : getData();
  }, [token, trips, type, userId]);

  const getData = async () => {
    await ShareExtension.data()
      .then((res) => {
        res
          ? (setType(res[0].type), setValue(res[0].value))
          : setError('Something went wrong. Try again!');
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
  );
};

export default Home;
