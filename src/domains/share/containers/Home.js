import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import ShareExtension from 'rn-extensions-share';
/** IMPORTS FROM WITHIN THE MODULE */
import {store} from 'src/store';
import {homeStyle as styles} from './HomeStyle';

const Home = (props) => {
  /* STATE VARIABLES AND STATE SETTING FUNCTIONS */
  const [type, setType] = useState(undefined);
  const [value, setValue] = useState(undefined);
  const [token, setToken] = useState(undefined);
  const [userId, setUserId] = useState(undefined);
  const [error, setError] = useState(null);
  const [trips, setTrips] = useState(undefined);

  /* REGEX */
  const bookingRegex = new RegExp('www.booking.com/hotel');
  const PDFRegex = new RegExp('^file:.*.pdf$');

  /* HANDLERS */
  // Execute on render.
  useEffect(() => {
    // Get the state from store, set token variable to 'auth' reducer's token value.
    setToken(store.getState().auth.token);
    // Get the state from store, set userId variable to 'auth' reducer's userId value.
    setUserId(store.getState().auth.userId);
    // If user isn't logged in...
    if (token === null && userId === null) {
      // set an error to 'Not logged in'.
      setError('You are not logged in.');
    } else if (token !== null && userId !== null) {
      // Else, get the state from store, set trips variable to 'trips' reducer's availableTrips value.
      setTrips(store.getState().trips.availableTrips);
    }
    // If type is undefined, launch getData() function to receive ShareExtenstion intent.
    type ? null : getData();
  }, [token, trips, type, userId]);

  // Receive intent from ShareExtension, catch errors and set type and value.
  const getData = async () => {
    // Receive intent; if Promise fails, set an error.
    await ShareExtension.data()
      .then((res) => {
        // If response is truthy, set type and value.
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
