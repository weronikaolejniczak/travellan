import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import ShareExtension from 'rn-extensions-share';
/** imports from within the module */
import {store} from 'src/store';
import Accommodation from 'share/components/accommodation/Accommodation';
import Toolbar from 'share/components/toolbar/Toolbar';
import {homeStyle as styles} from './HomeStyle';
import {HOTEL} from 'share/data/DummyHotel';

const Home = (props) => {
  /* sharing intent */
  const [type, setType] = useState(undefined);
  const [value, setValue] = useState(undefined);
  const [loading, setLoading] = useState(false);
  /* user credentials */
  const [token, setToken] = useState(undefined);
  const [userId, setUserId] = useState(undefined);
  const [loggedIn, setLoggedIn] = useState(false);
  /* error */
  const [error, setError] = useState(null);
  /* trips placeholder */
  const [trips, setTrips] = useState(undefined);
  /* actions */
  const [accepted, setAccepted] = useState(false);
  const [tripsToUpdate, setTripsToUpdate] = useState(undefined);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  /* booking.com hotel URL regex */
  const bookingRegex = new RegExp('booking.com/hotel');

  /* HANDLERS */
  // execute on render
  useEffect(() => {
    setLoading(true);
    // get the state from store, set token and userId variables to 'auth' reducer's token and userId values, respectively
    setToken(store.getState().auth.token);
    setUserId(store.getState().auth.userId);
    // if user isn't logged in...
    if (
      token === null ||
      token === undefined ||
      userId === null ||
      userId === undefined
    ) {
      // set an error to 'Not logged in'
      setError('You are not logged in.');
      setLoading(false);
    } else {
      setLoggedIn(true);
      // else, get the state from store, set trips variable to 'trips' reducer's availableTrips value
      setTrips(store.getState().trips.availableTrips);
      // if type isn't undefined, launch getData() function to receive ShareExtenstion intent
      if (type !== undefined) {
        getData();
        setLoading(false);
      }
    }
  }, [token, trips, type, userId]);

  // receive intent from ShareExtension, catch errors and set type and value
  const getData = async () => {
    // receive intent; if Promise fails, set an error
    await ShareExtension.data()
      .then((res) => {
        // if response is truthy, set type and value
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
      {!loggedIn ? (
        /* status component: not logged in error */
        <Text>Hello</Text>
      ) : value.match(bookingRegex) ? (
        <View>
          {/* activity indicator when fetching data from scraper API */}
          {loading && <ActivityIndicator />}

          {/* toolbar component */}
          <Toolbar
            styles={styles}
            onPressClose={() => ShareExtension.close()}
            onPressCheck={() => setAccepted(true)}
            sending={sending}
            accepted={accepted}
          />

          {/* accommodation component
          show only if accommodation is not yet accepted */}
          {!accepted && <Accommodation styles={styles} HOTEL={HOTEL} />}

          {/* trip selection component
          show only if accommodation was accepted but we haven't sent it to our trips yet */}
          {!sending && accepted && (
            <View style={{flex: 1}}>
              {/* if there are trips - variable trips is not undefined */}
              {!!trips && (
                <View>
                  {/* trip selection component */}
                  {/* send button component */}
                </View>
              )}

              {/* status component: no trips found error */}
              {!trips && <Text>Hello</Text>}
            </View>
          )}

          {/* activity indicator when sending accommodation to trip/trips */}
          {sending && <ActivityIndicator />}

          {/* status component: success or failure */}
          {sent && <Text>Hello</Text>}
        </View>
      ) : (
        /* status component: shared content not supported */
        <Text>Hello</Text>
      )}
    </View>
  );
};

export default Home;
