import React, {useState, useEffect} from './node_modules/react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import ShareExtension from './node_modules/rn-extensions-share';
import Icon from './node_modules/react-native-vector-icons/MaterialCommunityIcons';
/** IMPORTS FROM WITHIN THE MODULE */
import {store} from '../../App/Stores/index';
import AccommodationCard from '../components/specific/AccommodationCard';
import {homeScreenStyle as styles} from './HomeScreenStyle';
import Colors from '../../App/Constants/Colors';

/* MODES */
const PDF_TICKET = 'PDF_TICKET';
const PDF_RESERVATION = 'PDF_RESERVATION';
const BOOKING_COM = 'BOOKING_COM';

const HomeScreen = (props) => {
  /* STATE VARIABLES AND STATE SETTING FUNCTIONS */
  const [type, setType] = useState(undefined);
  const [value, setValue] = useState(undefined);
  const [mode, setMode] = useState(undefined);
  /* AUTH */
  const [token, setToken] = useState(undefined);
  const [userId, setUserId] = useState(undefined);
  /* ERROR */
  const [error, setError] = useState(null);
  /* PLACEHOLDERS */
  const [trips, setTrips] = useState(undefined);
  const [tripIds, setTripIds] = useState([]);
  /* LOADER */
  const [isLoading, setIsLoading] = useState(false);

  /* REGEX */
  const bookingRegex = new RegExp('www.booking.com/hotel');
  const pdfRegex = new RegExp('^file:.*.pdf$');

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
      setError('Not logged in.');
    } else if (token !== null && userId !== null) {
      // Else, get the state from store, set trips variable to 'trips' reducer's availableTrips value.
      setTrips(store.getState().trips.availableTrips);
      // Set mode.
    }
    // If type is undefined, launch getData() function to receive ShareExtenstion intent.
    type ? console.log('ALREADY ASSIGNED') : getData();
    // Set loader to 'false'.
    setIsLoading(false);
  }, [token, trips, type, userId]);

  // Receive intent from ShareExtension, catch errors and set type and value.
  const getData = async () => {
    // Receive intent; if Promise fails, set an error.
    const response = await ShareExtension.data().catch((err) => setError(err));
    // If response is truthy, set type and value.
    response
      ? (setType(response[0].type), setValue(response[0].value))
      : setError('Something went wrong. Try again!');
  };

  const modeHandler = () => {
    
  };

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
      <View style={styles.actionsContainer}>
        {/* CLOSE BUTTON */}
        {showData && !error && (
          <TouchableOpacity onPress={() => ShareExtension.close()}>
            <Icon name={'close'} style={styles.icon} />
          </TouchableOpacity>
        )}

        {/* GO BACK BUTTON */}
        {showTrips && !error && (
          <TouchableOpacity
            onPress={() => {
              setShowTrips(false);
              setShowData(true);
            }}>
            <Icon name={'backspace'} style={styles.icon} />
          </TouchableOpacity>
        )}

        {/* SAVE BUTTON */}
        {showData && !error && (
          <TouchableOpacity
            onPress={() => {
              setShowData(false);
              setShowTrips(true);
            }}>
            <Icon name={'check'} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>

      {/* ERRORS */}
      {!!error && (
        <View style={styles.centered}>
          <Text style={styles.icon}>{error}</Text>
        </View>
      )}

      {/* FLOW FOR LINK FROM BOOKING.COM */}
      {!!(
        showData &&
        !error &&
        type === 'text' &&
        bookingRegex.test(value)
      ) && (
        <View style={styles.dataContainer}>
          <AccommodationCard
            imageUrl={
              'https://q-cf.bstatic.com/images/hotel/max1280x900/224/224237421.jpg'
            }
            type={'hotel'}
            name={'Platinum Mountain Hotel&SPA'}
            address={'Kilińskiego, 58-580 Szklarska Poręba, Poland'}
            ammenities={[
              '2 swimming pools',
              'Pet friendly',
              'Spa',
              'Parking',
              'Free WiFi',
              'Bar',
              'Tea/Coffee Maker in All Rooms',
            ]}
            description={
              'Located in Szklarska Poręba, a 10-minute walk from Szklarska Poreba Bus Station, Platinum Mountain Hotel&SPA provides accommodations with a bar and private parking. Offering a restaurant, the property also has a seasonal outdoor swimming pool, as well as an indoor pool and a fitness center. The property has a 24-hour front desk, airport transportation, room service and free WiFi throughout the property. The rooms comes with air conditioning, a flat-screen TV with satellite channels, a fridge, an electric tea pot, a shower, a hairdryer and a desk. Rooms are complete with a private bathroom equipped with free toiletries, while certain accommodations at the hotel also feature a seating area. All guest rooms have a closet. Guests at Platinum Mountain Hotel&SPA can enjoy a continental breakfast. The accommodation offers 5-star accommodations with a hammam and playground. The area is popular for skiing and cycling, and ski equipment rental is available at Platinum Mountain Hotel&SPA. Popular points of interest near the hotel include Szrenica Hill, Mineralogy Museum and Babiniec Winter Sports Centre.'
            }
            attractions={[{id: 0, name: 'Resort', distance: '0.3km'}]}
            hotelRules={{checkIn: 'From 4:00 PM', checkOut: 'Until 11:00 AM'}}
          />
        </View>
      )}

      {/* FLOW FOR PDF */}
      {!!(showData && !error && pdfRegex.test(value)) && (
        <View style={[styles.centered, styles.dataContainer]}>
          <Text style={[styles.text, styles.header]}>The file contains my</Text>
          <View style={[styles.bigMarginTop, styles.choiceContainer]}>
            {/* ACCOMMODATION BUTTON */}
            <TouchableOpacity
              onPress={() => setPdfType('reservation')}
              style={[
                styles.button,
                {
                  backgroundColor:
                    pdfType === 'reservation'
                      ? Colors.primary
                      : Colors.transparent,
                },
              ]}>
              <Text style={[styles.text, styles.label]}>
                housing reservation
              </Text>
            </TouchableOpacity>
            {/* TRANSPORT BUTTON */}
            <TouchableOpacity
              onPress={() => setPdfType('transport')}
              style={[
                styles.button,
                {
                  backgroundColor:
                    pdfType === 'transport'
                      ? Colors.primary
                      : Colors.transparent,
                },
              ]}>
              <Text style={[styles.text, styles.label]}>transport ticket</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* FLOW FOR CHOOSING TRIPS AND SAVING */}
      {showTrips && !error && (
        <View style={styles.bigMarginTop}>
          <Text style={[styles.label, styles.text]}>Add to:</Text>
          <ScrollView style={styles.smallMarginTop}>
            {trips.map((item, id) => (
              <TouchableOpacity
                onPress={() => process(item.id)}
                style={[
                  styles.button,
                  {
                    backgroundColor: tripIds.includes(item.id)
                      ? Colors.primary
                      : Colors.transparent,
                  },
                ]}>
                <Text style={styles.text}>
                  {item.destination} ({trim(item.startDate)} -{' '}
                  {trim(item.endDate)})
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
