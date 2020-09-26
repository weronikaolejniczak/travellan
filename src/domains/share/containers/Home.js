import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import ShareExtension from 'rn-extensions-share';
/* imports from within the module */
import {store} from 'src/store';
import Loading from 'components/frames/loading/Loading';
import Accommodation from 'share/components/accommodation/Accommodation';
import Toolbar from 'share/components/toolbar/Toolbar';
import {homeStyle as styles} from './HomeStyle';
import {Typography, Layout} from 'constants';
import {HOTEL} from 'share/data/DummyHotel';

const Home = (props) => {
  /* sharing intent */
  const [type, setType] = useState(undefined);
  const [value, setValue] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  /* user credentials */
  const [token, setToken] = useState(undefined);
  const [userId, setUserId] = useState(undefined);
  /* error */
  const [error, setError] = useState(null);

  /* regexp */
  const bookingRegex = new RegExp('booking.com/hotel', 'i');

  /* handlers */
  useEffect(() => {
    setToken(store.getState().auth.token);
    setUserId(store.getState().auth.userId);
    const getData = async () => {
      setError(null);
      setIsLoading(true);
      try {
        const result = await ShareExtension.data(); // type = 'media' pdf | 'text' url
        setType(result[0].type);
        setValue(result[0].value);
      } catch (err) {
        setError(error);
      }
      setIsLoading(false);
    };
    getData();
  }, [error, token, type, userId, value]);

  if (isLoading) {
    return <Loading />;
  } else if (token === undefined && userId === undefined) {
    return (
      <View style={[styles.container, Layout.center]}>
        <Text style={[styles.text, Typography.mainHeader]}>
          You're not logged in!
        </Text>
      </View>
    );
  } else if (error) {
    return (
      <View style={[styles.container, Layout.center]}>
        <Text style={[styles.text, Typography.mainHeader]}>{error}</Text>
      </View>
    );
  } else if (type === 'media' && bookingRegex.match(value)) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{type}</Text>
        <Text style={styles.text}>{value}</Text>
      </View>
    );
  } else {
    console.log(getArrayValue);
    return (
      <View style={[styles.container, Layout.center]}>
        <Text style={[styles.text, Typography.mainHeader]}>
          We only support sharing hotels sites from Booking.com/hotel.
        </Text>
      </View>
    );
  }
};

export default Home;
