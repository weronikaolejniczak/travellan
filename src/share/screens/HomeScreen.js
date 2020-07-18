import React, {useState, useEffect, useCallback} from 'react';
import {View, ActivityIndicator} from 'react-native';
import ShareExtension from 'rn-extensions-share';
/** IMPORTS FROM WITHIN THE MODULE */
import {store} from '../../app/stores/index';
import {homeScreenStyle as styles} from './HomeScreenStyle';
import ActionBar from '../components/atoms/ActionBar';
import ErrorStage from '../components/stages/ErrorStage';
import ChoiceStage from '../components/stages/ChoiceStage';
import Colors from '../../app/constants/Colors';

/* MODES */
const PDF = 'PDF';
const BOOKING_COM = 'BOOKING_COM';
const INCORRECT_TYPE = 'INCORRENT_TYPE';

const HomeScreen = (props) => {
  /* STATE VARIABLES AND STATE SETTING FUNCTIONS */
  const [type, setType] = useState(undefined);
  const [value, setValue] = useState(undefined);
  const [mode, setMode] = useState(undefined);
  const [PDFMode, setPDFMode] = useState(undefined);
  const [actions, setActions] = useState(['close', 'continue']);
  /* AUTHENTICATION */
  const [token, setToken] = useState(undefined);
  const [userId, setUserId] = useState(undefined);
  /* ERROR MESSAGE */
  const [error, setError] = useState(null);
  /* TRIPS PLACEHOLDER AND TRIP IDS CHOSEN BY USER */
  const [trips, setTrips] = useState(undefined);
  const [tripIds, setTripIds] = useState([]);
  /* LOADER */
  const [isLoading, setIsLoading] = useState(false);

  /* REGEX */
  const bookingRegex = new RegExp('www.booking.com/hotel');
  const PDFRegex = new RegExp('^file:.*.pdf$');

  /* HANDLERS */
  // Execute on render.
  useEffect(() => {
    // Set loader to 'true'.
    setIsLoading(true);
    // Get the state from store, set token variable to 'auth' reducer's token value.
    setToken(store.getState().auth.token);
    // Get the state from store, set userId variable to 'auth' reducer's userId value.
    setUserId(store.getState().auth.userId);
    // If user isn't logged in...
    if (token === null && userId === null) {
      // set an error to 'Not logged in'.
      setError('You are not logged in.');
      setActions(['close']);
    } else if (token !== null && userId !== null) {
      // Else, get the state from store, set trips variable to 'trips' reducer's availableTrips value.
      setTrips(store.getState().trips.availableTrips);
    }
    // If type is undefined, launch getData() function to receive ShareExtenstion intent.
    type ? null : getData();
    // Set loader to 'false'.
    setIsLoading(false);
  }, [getData, token, trips, type, userId]);

  // Receive intent from ShareExtension, catch errors and set type and value.
  const getData = useCallback(async () => {
    // Receive intent; if Promise fails, set an error.
    await ShareExtension.data()
      .then((res) => {
        // If response is truthy, set type and value.
        res
          ? (setType(res[0].type), setValue(res[0].value))
          : (setError('Something went wrong. Try again!'),
            setActions(['close']));
        // Set mode.
        if (
          res &&
          !error &&
          res[0].type === 'text' &&
          bookingRegex.test(res[0].value)
        ) {
          setMode(BOOKING_COM);
        } else if (
          res &&
          !error &&
          res[0].type === 'media' &&
          PDFRegex.test(res[0].value)
        ) {
          setMode(PDF);
        } else {
          setMode(INCORRECT_TYPE);
          setError('Incorrect type.');
          setActions(['close']);
        }
      })
      .catch((err) => {
        setError(err);
      });
  }, [PDFRegex, bookingRegex, error]);

  // Handle choosing trips' IDs by user.
  const tripIdsHandler = (id) => {
    tripIds.includes(id)
      ? setTripIds(tripIds.filter((item) => item !== id))
      : setTripIds([...new Set([...tripIds, id])]);
  };

  // Trim a string.
  const trim = (string) => string.split(' ').slice(1, 4).join(' ');

  /** ACTIVITY INDICATOR */
  if (isLoading) {
    return (
      <View style={[styles.centered, {backgroundColor: Colors.background}]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* ACTION BAR - display an action bar */}
      <ActionBar
        actions={actions}
        close={() => ShareExtension.close()}
        goBack={() => {}}
        continue={() => {}}
        save={() => {}}
      />

      {/* ERROR - display error */}
      {!error && <ErrorStage err={error} />}

      {/* CHOICE STAGE - if PDF, let user choose the type of PDF content: ticket, reservation */}
      {!!error && mode === PDF && (
        <ChoiceStage type={PDFMode} setType={() => setPDFMode()} />
      )}

      {/* VALIDATION STAGE - validate the element with user*/}

      {/* ASSIGNMENT STAGE - assign the element to chosen trips */}

      {/* STATUS STAGE - display the status of sharing */}
    </View>
  );
};

export default HomeScreen;
